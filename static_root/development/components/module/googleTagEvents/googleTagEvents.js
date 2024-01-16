export const addToCartGT = ({
    name,
    id,
    price
}) => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'add_to_cart',
        'ecommerce': {
            'currency': 'UAH',
            'add': {
                'products': [{
                    name,
                    id,
                    price,
                    brand: "dunlop",
                    quantity: 1
                }]
            }
        }
    });
}

export const removeCardGT = ({
    name,
    id,
    price,
    quantity
}) => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'remove_from_cart',
        'ecommerce': {
            'currency': 'UAH',
            'remove': {
                'products': [{
                    name,
                    id,
                    price,
                    brand: "dunlop",
                    quantity
                }]
            }
        }
    });
}

export const purchaseGT = ({
    transaction_id,
    value,
    items
}) => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'purchase',
        transaction_id,
        value,
        'currency': 'UAH',
        items
    });
}