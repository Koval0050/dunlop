from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
from django.http import Http404
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


from .serializers import (
    CartProductSerializer,
    CartSerializer,
)
from ..models import CartProduct
from catalog.models import Product
from cart.utils import get_cart


class CartProductPermission(permissions.DjangoObjectPermissions):
    def has_object_permission(self, request, view, obj):
        cart = get_cart(request)
        if obj == cart:
            return True
        return False


class CartProductDetailView(APIView):
    queryset = CartProduct.objects.all()

    def get_object(self, id):
        try:
            return CartProduct.objects.get(id=id)
        except CartProduct.DoesNotExist:
            raise Http404

    @csrf_exempt
    @permission_classes([CartProductPermission])
    def get(self, request, id, format=None):
        cart_product = self.get_object(id)
        serializer = CartProductSerializer(cart_product)
        return Response(serializer.data)

    @csrf_exempt
    @permission_classes([CartProductPermission])
    def delete(self, request, id, format=None):
        cart = get_cart(request)
        snippet = self.get_object(id)
        snippet.delete()
        return Response(
            CartSerializer(cart, context={"request": request}).data,
            status=status.HTTP_200_OK,
        )

    @csrf_exempt
    @permission_classes([CartProductPermission])
    def patch(self, request, id, format=None):
        cart = get_cart(request)
        cart_product = self.get_object(id)
        serializer = CartProductSerializer(
            cart_product, data=request.data, partial=True
        )
        if (
            not cart_product.able_add_to_cart(request.data["quantity"])
            or not serializer.is_valid()
        ):
            return Response(
                "Неможливо додати товар у корзину.",
                status=status.HTTP_400_BAD_REQUEST,
                content_type="text-plain",
            )
        serializer.save()
        return Response(
            CartSerializer(cart, context={"request": request}).data,
            status=status.HTTP_200_OK,
        )


class CartProductListView(APIView):
    serializer_class = CartProductSerializer
    queryset = CartProduct.objects.all()

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        try:
            request.data._mutable = True
        except:
            "it is not a drf request"
        cart = get_cart(request)
        request.data["cart"] = cart.id
        quantity = int(request.data["quantity"])
        serializer = CartProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = Product.objects.filter(id=request.data["product"]).first()
        unique_data_fields = {
            "cart": serializer.validated_data["cart"],
            "product": serializer.validated_data["product"],
            "product_color": serializer.validated_data["product_color"],
            "product_size": serializer.validated_data["product_size"],
        }
        cart_product = CartProduct.objects.filter(**unique_data_fields).first()
        if cart_product and cart_product.able_add_to_cart(
            quantity=quantity + cart_product.quantity
        ):
            cart_product.quantity += quantity
            cart_product.save()
        elif not cart_product and product.quantity > quantity:
            cart_product = CartProduct.objects.create(**serializer.validated_data)
        else:
            return Response(
                {"message": "Неможливо додати товар у корзину."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            CartSerializer(cart, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )
