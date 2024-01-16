import './star_rate.scss'
import './index.scss'
import { minus, plus, input_basket, delete_item, create_city_select, create_department_select, change_counter } from '../shop_scripts/index';
let checker = document.querySelectorAll('.catalog_swiper').length;
if (checker >= 1) {
    let swiper = new Swiper(".catalog_swiper", {
        lazy: true,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 1000,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            600: {
                slidesPerView: 2,
            },
            300: {
                slidesPerView: 1,
            },
        },
    });
}

let all_count_plus = document.querySelectorAll('.count_plus');
let all_count_minus = document.querySelectorAll('.count_minus');
let all_count_input = document.querySelectorAll('.count_input');
let all_card_btn = document.querySelectorAll('.product_card_btn');
let all_delete_btn = document.querySelectorAll('.basket_item_delete');
let delete_cards = document.querySelector('.basket_total_clear_btn');
let card_like = document.querySelectorAll('.card_like');
let item_like = document.querySelector('.item_like');
let card_like_delete = document.querySelectorAll('.card_delete');

if (card_like_delete != null) {
    card_like_delete.forEach(like_btn_delete => {
        like_btn_delete.addEventListener("click", function() {
            let item_id = this.closest('.product_card__block').dataset.quantity_item_id;

            fetch(`/api/favour_item/${item_id}/remove_by_like/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((data) => {
                    return data.json();
                })
                .then((body) => {
                    delete_item(this, '.product_card__block');
                });
        });
    });
}


if (item_like != null) {
    item_like.addEventListener("click", function() {
        let item_id = this.closest('.product_card__block').dataset.quantity_item_id;
        var arr_api = {
            item_id: Number(item_id),
        };

        document.querySelector('.navigation_icon_like').style.transform = 'scale(1.3)';
        setTimeout(() => {
            document.querySelector('.navigation_icon_like').style.transform = 'scale(1)';
        }, 200);

        fetch(`/api/favour_items/`, {
            method: "POST",
            body: JSON.stringify(arr_api),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
    });
}

if (card_like != null) {
    card_like.forEach(like_btn => {
        like_btn.addEventListener("click", function() {
            let item_id = this.closest('.product_card__block').dataset.quantity_item_id;
            console.log('this: ', this);
            console.log('item_id: ', item_id);
            var arr_api = {
                item_id: Number(item_id),
            };


            document.querySelector('.navigation_icon_like').style.transform = 'scale(1.3)';
            setTimeout(() => {
                document.querySelector('.navigation_icon_like').style.transform = 'scale(1)';
            }, 200);


            fetch(`/api/favour_items/`, {
                method: "POST",
                body: JSON.stringify(arr_api),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
        });
    });
}



if (delete_cards != null) {
    delete_cards.addEventListener("click", function() {
        fetch(`/api/cart_items/`, {
                method: 'DELETE',
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                let all_cards = document.querySelectorAll('.product_card__block');
                all_cards.forEach(card => {
                    let pseudo_btn = card.querySelector('.basket_item_delete');
                    delete_item(pseudo_btn, '.product_card__block');
                });

                change_counter(data.cart_items_quantity, null, '.header_counter');
                change_counter(data.cart_total_price, null, '.header_price');

                let length_item = $('.product_card__block_all_value').length;
                let current_price = Number(wrapper.querySelector('.product_card__block_all_value').textContent);
                let all_price;
                if (length_item == 1) {
                    all_price = 0;
                } else {
                    all_price = return_all_price() - current_price;
                }

                document.querySelector('.product_card_total_price').textContent = `${parseInt(all_price)}`;
            });
    });
}

if (all_delete_btn != null) {

    all_delete_btn.forEach(element => {
        element.addEventListener('click', function() {
            let wrapper = this.closest('.product_card__block');
            let item_id = Number(wrapper.dataset.quantity_item_id);

            fetch(`/api/cart_item/${item_id}`, {
                    method: 'DELETE',
                })
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    delete_item(this, '.product_card__block');
                    change_counter(data.cart_items_quantity, null, '.header_counter');
                    change_counter(data.cart_total_price, null, '.header_price');

                    let length_item = document.querySelectorAll('.product_card__block_all_value').length;
                    let current_price = Number(wrapper.querySelector('.product_card__block_all_value').textContent);
                    let all_price;
                    if (length_item == 1) {
                        all_price = 0;
                    } else {
                        all_price = return_all_price() - current_price;
                    }

                    document.querySelector('.product_card_total_price').textContent = `${parseInt(all_price)}`;
                });
        });
    });
}


all_card_btn.forEach(element => {

    element.addEventListener('click', function() {
        let input = this.closest('.product_card__block').querySelector('.count_input');
        let quantity = input != null ? Number(input.value) : 1;
        let item_id = Number(this.closest('.product_card__block').dataset.quantity_item_id);
        let body = {
            "item_id": item_id,
            "quantity": quantity
        }

        fetch('/api/cart_items/', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                change_counter(data.cart_items_quantity, null, '.header_counter');
                change_counter(data.cart_total_price, null, '.header_price');
            });
    })
});



all_count_plus.forEach(count => {
    count.addEventListener('click', function() {
        let value = plus('.product_card__block', '.count_input', this);
        let wrapper = this.closest('.product_card__block');
        let item_id = Number(wrapper.dataset.quantity_item_id);
        change_quantity(item_id, value, wrapper);
    });

});

all_count_minus.forEach(count => {
    count.addEventListener('click', function() {
        let value = minus('.product_card__block', '.count_input', this);
        let wrapper = this.closest('.product_card__block');
        let item_id = Number(wrapper.dataset.quantity_item_id);
        change_quantity(item_id, value, wrapper);
    });

});


all_count_input.forEach(count => {

    count.addEventListener('change', function() {
        let value = input_basket(this);
        let wrapper = this.closest('.product_card__block');
        let item_id = Number(wrapper.dataset.quantity_item_id);
        change_quantity(item_id, value, wrapper);
    });

});

function change_quantity(item_id, value, wrapper) {
    let check_item = wrapper.classList.contains('item__block');

    if (!check_item) {
        fetch(`/api/cart_item/${item_id}/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    quantity: value,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                change_counter(data.cart_items_quantity, null, '.header_counter');
                if (document.querySelector('.product_card_total_price') != undefined) {
                    wrapper.querySelector('.product_card__block_all_value').textContent = `${parseInt(data.cart_item_total_price)}`;
                    // let all_price = return_all_price();
                    document.querySelector('.product_card_total_price').textContent = `${parseInt(data.cart_total_price)}`;
                }
                // $('.basket_all_sale_payment').text(`${data.cart_total_price} ${data.cart_currency}`);
            });
    }

}


function return_all_price() {
    let all_item = document.querySelectorAll('.product_card__block_all_value');
    let all_price = 0;
    all_item.forEach(element => {
        let price = Number(element.dataset.price);
        all_price += price;
    });

    return all_price;
}


let item_content_info_btn_fast = document.querySelector('.item_content_info_btn_fast');
let card_fast_buy = document.querySelectorAll('.card_fast_buy');
if (item_content_info_btn_fast != null) {
    item_content_info_btn_fast.addEventListener("click", function() {
        let name = this.dataset.card_name;
        let container = document.querySelector('.modal__block_fast_buy');
        let name_section = container.querySelector('.modal_name');
        let item_id = document.querySelector('.item_content_info__block').dataset.quantity_item_id;
        let item_id_input = document.querySelector('.modal_form_fast_buy_hidden');
        item_id_input.value = item_id;
        name_section.textContent = name;
    })
}

if (card_fast_buy != null) {
    card_fast_buy.forEach(element => {
        let wrapper = element.closest('.card_item');
        let name_product = wrapper.querySelector('.card_title').textContent;
        let item_id = wrapper.dataset.quantity_item_id;
        let item_id_input = document.querySelector('.modal_form_fast_buy_hidden');

        element.addEventListener("click", function(e) {
            let container = document.querySelector('.modal__block_fast_buy');
            let name_section = container.querySelector('.modal_name');
            console.log('name_section: ', name_section);
            name_section.textContent = name_product;
            item_id_input.value = item_id;
        })
    });
}