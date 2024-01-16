from django.contrib import sitemaps
from django.urls import reverse

from catalog.models import Product

class StaticSitemap(sitemaps.Sitemap):
  def items(self):
    return [
    'index',
    'delivery',
    'order',
    ]
    
  def location(self, item):
    return reverse(item)

class ProductSitemap(sitemaps.Sitemap):
    changefreq = 'weekly'
    priority = 1
    protocol = 'https'

    def items(self):
        return Product.objects.all()
        
    def lastmod(self, obj):
        return obj.updated

    def location(self, obj):
        return obj.get_absolute_url()

sitemaps = {
  'static': StaticSitemap,
  'products': ProductSitemap,
}
