import './index.scss'
import { minus, plus } from "../../module/shop_scripts";

export function countInit() {
    let all_count_plus = document.querySelectorAll('.count_plus');
    let all_count_minus = document.querySelectorAll('.count_minus');
    
    all_count_plus.forEach(count => {
        count.addEventListener('click', function() {
            let value = plus('.product_card_description', '.count_input', this);
            let wrapper = this.closest('.product_card_description');
            let item_id = Number(wrapper.dataset.quantity_item_id);
            // change_quantity(item_id, value, wrapper);
            document.querySelector('.quckly_shop_form').dataset.count = value
        });
    
    });
    
    all_count_minus.forEach(count => {
        count.addEventListener('click', function() {
            let value = minus('.product_card_description', '.count_input', this);
            let wrapper = this.closest('.product_card_description');
            let item_id = Number(wrapper.dataset.quantity_item_id);
            document.querySelector('.quckly_shop_form').dataset.count = value
            // change_quantity(item_id, value, wrapper);
        });
    
    });


    const count_blocks = document.querySelectorAll('.count__block')
    // const value = +product_all_sum.textContent.replace(',','.')
    count_blocks.forEach(block => {
        block.addEventListener('click', (e) => {
            
            const target = e.target
            const product_all_sum = target.closest('.description_buy').querySelector('.product_all_sum')
            const value = +product_all_sum.dataset.price
            let sum = +product_all_sum.textContent;
            
            if (target.tagName === "DIV") {
                if (target.classList.contains('count_plus')) {
                    sum += value
                    product_all_sum.textContent = sum + '.0'
                }
                else if (target.classList.contains('count_minus')) {
                    sum -= value
                    if (sum < value) {
                        sum += value
                        product_all_sum.textContent = sum + '.0'
                    } else {
                        product_all_sum.textContent = sum + '.0'
                    }
                }
            }
        })
    })
}

countInit()