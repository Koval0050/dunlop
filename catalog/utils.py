

def create_visit(request, product_id):
    max = 10
    visits: list = request.session.get('viewed_products', [])
    if len(visits) >= max:
        visits.pop()
    if product_id in visits:
        visits.pop(visits.index(product_id))
        visits.insert(0, product_id)
    else:
        visits.insert(0, product_id)
    request.session['viewed_products'] = visits
