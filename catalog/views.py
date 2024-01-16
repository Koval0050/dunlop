from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.db.models import Count

from .models import Product, Review, ProductAdvantage
from .utils import create_visit


def product(request, slug):
    prev_url = request.META.get("HTTP_REFERER") or reverse("index")
    product = get_object_or_404(Product, slug=slug)
    create_visit(request, product.id)
    viewed_products = Product.objects.filter(id__in=request.session['viewed_products'])
    reviews = Review.objects.filter(is_active=True, product=product).annotate(count=Count('id'))
    advantages = ProductAdvantage.objects.all()
    return render(
        request=request,
        template_name="product.html",
        context={"product": product, "prev_url": prev_url, "reviews": reviews, "viewed_products": viewed_products, 'advantages': advantages},
    )
