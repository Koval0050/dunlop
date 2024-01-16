from django.http import HttpResponse, FileResponse
from django.shortcuts import render, get_object_or_404
from catalog.models import Product, ProductCategory, ProductAdvantage
from django.urls import reverse
from lxml import etree
from s_content.models import Page
from .google_feed import get_entries, get_root_tree


def index(request):
    page = get_object_or_404(Page, slug="index")
    categories = ProductCategory.objects.filter(is_active=True)
    advantages = ProductAdvantage.objects.all()
    return render(
        request,
        "index.html",
        context={"categories": categories, "advantages": advantages, "page": page},
    )


def delivery(request):
    page = get_object_or_404(Page, slug="delivery")
    prev_url = request.META.get("HTTP_REFERER") or reverse("index")
    return render(
        request, "delivery.html", context={"prev_url": prev_url, "page": page}
    )


def robots(request):
    lines = [
        "User-agent: Googlebot",
        "Disallow:",
        "User-agent: Googlebot-image",
        "Disallow:",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

def google_feed(request):
    root_tree = get_root_tree()
    channel = root_tree.find('channel')
    entries = get_entries()
    [channel.append(entry) for entry in entries]
    doc = etree.ElementTree(root_tree)
    doc.write('project/google_feed.xml', encoding='utf-8', xml_declaration=True, pretty_print=True)
    with open('project/google_feed.xml', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        lines[0] = '<?xml version="1.0"?>\n'
    with open('project/google_feed1.xml', 'w', encoding='utf-8') as f2:
        f2.writelines(lines)
    file = open('project/google_feed1.xml', 'rb')
    return FileResponse(file, as_attachment=True)