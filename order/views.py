from django.shortcuts import render, get_object_or_404
from django.shortcuts import get_object_or_404, redirect
from django.template.response import TemplateResponse

from s_content.models import Page
from .decorators import order_has_products

# Create your views here.


@order_has_products
def order(request):
    page = get_object_or_404(Page, slug="order")
    return render(
        request,
        "order.html",
        context={
            "page": page,
        },
    )
