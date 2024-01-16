from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test

from payment.utils import get_liqpay_context


# Create your views here.
@user_passes_test(lambda u: u.is_superuser)
def payment_view(request):
    signature, data = get_liqpay_context(request)
    context = {
        "signature": signature,
        "data": data
    }
    return render(request, "payment.html", context=context)
