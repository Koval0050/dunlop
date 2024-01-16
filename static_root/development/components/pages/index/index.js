import "./index.scss";
import "./top.scss";
import "./scope.scss";
import "./product.scss";
import "./advances.scss";
import "./innovation.scss";
import "./about.scss";

// import {description_advances, products_swiper, product_card__img} from '../../module/swiper'
// import 'swiper/swiper-bundle.css'

// let product_description_swiper = product_card__img
// let description_advances_var = description_advances

// document.querySelectorAll('.description_more-info').forEach(btn => {
//     btn.addEventListener('click', e => {
//         const card_description = e.target.closest('.product_card_description')
//         card_description.classList.toggle('active')
//         card_description.classList.contains('active') ?
//             e.target.textContent = 'ПЕреглянути менше' :
//             e.target.textContent = 'ПЕреглянути більше';
//     })
// })

// document.querySelectorAll('.product_btn_details').forEach(btn => {
//     btn.addEventListener('click', () => {
//         const card = btn.closest('.product_card')
//         const index = btn.closest('[data-index]').dataset.index
//         card.classList.add('active');
//         products_swiper[index].disable()
//         const this_swiper = card.querySelector('.product_card__img')

//         product_description_swiper.forEach(swiper => {
//             swiper.init()
//             if (swiper.el === this_swiper) {
//                 swiper.enable()
//                 return
//             }
//         })
//         setTimeout(() => {
//             description_advances_var.forEach(swiper => swiper.init())
//             description_advances_var.forEach(swiper => swiper.update())
//         }, 1000)
//     })
// })

// document.querySelectorAll('.product_card_description_close').forEach(close => {
//     close.addEventListener('click', () => {
//         const card = close.closest('.product_card')
//         const index = close.closest('[data-index]').dataset.index
//         card.classList.remove('active')

//         if (!document.getElementsByClassName('product_card active').length) {
//            products_swiper[index].enable()
//         }

//         const this_swiper = card.querySelector('.product_card__img')
//         product_description_swiper.forEach(swiper => {
//             if (swiper.el === this_swiper) {
//                 swiper.disable()
//                 return
//             }
//         })
//     })
// })
