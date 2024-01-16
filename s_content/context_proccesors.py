from .models import Site


def context(request):
    site = Site.objects.first()
    context = {
        "site": site,
    }
    return context
