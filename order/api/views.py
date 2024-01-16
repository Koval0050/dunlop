from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.shortcuts import reverse
from django.http import JsonResponse
from rest_framework import generics
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .serializers import OrderSerializer
from ..models import Order
from cart.utils import get_cart


class CantOrderExcpetion(PermissionDenied):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Максимальне значення товару перевищено"
    default_code = 'invalid'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    # def validate i should write some code here

    def create(self, request, *args, **kwargs):
        try:
            request.data._mutable = True
        except:
            "it is not a drf request"
        cart = get_cart(request)
        errors = []
        for cart_product in cart.cart_products.all():
            if cart_product.product.quantity < cart_product.quantity:
                errors.append(f'{cart_product.product.title} максимальна допустима кількість - {cart_product.product.quantity}')
        if errors:
            raise CantOrderExcpetion(detail='\n'.join(errors))
        request.data["total_price"] = cart.get_total_price()
        if not cart.cart_products.all().exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        headers = self.get_success_headers(serializer.data)
        order = Order.objects.create(**serializer.validated_data)
        cart.order = order
        # if request.data["payment_type"] == "Оплатити зараз":
        #     cart.save()
        #     url = reverse("payment")
        #     return JsonResponse({"url": url, "order_id": order.id})
        cart.ordered = True
        cart.save()
        recipients = settings.DEFAULT_RECIPIENT_LIST.copy()
        recipients.append(order.email)
        send_mail(
            subject="Dunlop - оформлення замовлення",
            message="Dunlop - оформлення замовлення",
            html_message=render_to_string("includes/mail/make_order.html", locals()),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipients,
            fail_silently=False,
        )
        # settings.DEFAULT_RECIPIENT_LIST.remove(order.email)
        return Response(
            OrderSerializer(order, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
