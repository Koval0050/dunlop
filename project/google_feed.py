from lxml import etree
from lxml.etree import Element, CDATA
from typing import Iterator, Set
from django.db.models import Model
from catalog.models import Product

XHTML_NAMESPACE = "http://base.google.com/ns/1.0"
XHTML = '{%s}' % XHTML_NAMESPACE
NSMAP = {'g' : XHTML_NAMESPACE}

def get_root_tree() -> Element:
    root_tree = Element('rss', nsmap=NSMAP)
    channel = Element('channel', )
    root_tree.append(channel)
    return root_tree

def get_entry(item:Model) -> Element:

    def set_title(entry:Element) -> None:
        title = Element(XHTML + 'title')
        title.text = item.title
        entry.append(title)

    def set_link(entry:Element) -> None:
        link = Element(XHTML + 'link')
        link.text = 'https://mydunlop.com.ua' + item.get_absolute_url()
        entry.append(link)

    def set_id(entry:Element) -> None:
        id = Element(XHTML + 'id')
        id.text = str(item.id)
        entry.append(id)

    def set_price(entry:Element) -> None:
        price = Element(XHTML + 'price')
        price.text = str(item.price) + ' UAH'
        entry.append(price)

    def set_description(entry:Element) -> None:
        description = Element(XHTML + 'description')
        description.text = CDATA(item.short_description)
        entry.append(description)

    def set_brand(entry:Element) -> None:
        brand = Element(XHTML + 'brand')
        brand.text = 'Dunlop'
        entry.append(brand)

    def set_condition(entry:Element) -> None:
        condition = Element(XHTML + 'condition')
        condition.text = 'new'
        entry.append(condition)

    def set_image_link(entry:Element) -> None:
        image_link = Element(XHTML + 'image_link')
        image_link.text = item.get_absolute_image_url()
        entry.append(image_link)
    
    def set_additional_image_link(entry:Element) -> None:
        images = item.images.all()
        for image in images:
            additional_image_link = Element(XHTML + 'additional_image_link')
            additional_image_link.text = image.get_absolute_image_url()
            if image.get_absolute_image_url():
                entry.append(additional_image_link)

    def set_availability(entry:Element) -> None:
        availability = Element(XHTML + 'availability')
        availability.text = 'in_stock' if item.quantity > 0 else 'out_of_stock'
        entry.append(availability)

    entry = Element('item')
    set_title(entry)
    set_link(entry)
    set_id(entry)
    set_price(entry)
    set_description(entry)
    set_brand(entry)
    set_condition(entry)
    set_image_link(entry)
    set_additional_image_link(entry)
    set_availability(entry)
    return entry

def get_entries() -> Iterator[Element]:
    products = Product.objects.filter(is_active=True)
    entries = (get_entry(product) for product in products)
    return entries