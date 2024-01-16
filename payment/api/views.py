from django.shortcuts import redirect

from ..liqpay_payment import LiqPay

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from ..utils import get_liqpay_response, create_payment

PUBLIC_KEY = "sandbox_i501929665"
PRIVATE_KEY = "sandbox_wetwRfwhIHMC8tGBoSVPlYDY70ycpk7zu3CwnuF8"


@csrf_exempt
def pay_callback(request):
    print("pay callback")
    response = get_liqpay_response(request)
    create_payment(request, response)
    return redirect("index")
