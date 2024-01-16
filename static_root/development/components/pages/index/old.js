// import './index.scss'
// import './top.scss'
// import './scope.scss'
// import './product.scss'
// import './advances.scss'
// import './innovation.scss'
// import './about.scss'
// import {description_advances, products_swiper, product_card__img} from '../../module/swiper'
// import {initModalOpen} from '../../module/modal_script'
// import Swiper, { Navigation } from 'swiper';
// import 'swiper/swiper-bundle.css'
// import { countInit } from '../../common_componentc/product_count'

// Swiper.use([Navigation])

//const productCategory = document.querySelector('.product_category')
//const productCardContainer = document.querySelector('.product_card_container')
//const productCategoryItem = document.querySelectorAll('.product_category__item')
//const linksCategory = document.querySelectorAll('.link_category')
// let product_description_swiper = product_card__img
// let description_advances_var = description_advances

// function moreInfoInit() {
//     document.querySelectorAll('.description_more-info').forEach(btn => {
//         btn.addEventListener('click', e => {
//             const card_description = e.target.closest('.product_card_description')
//             card_description.classList.toggle('active')
//             card_description.classList.contains('active') ? 
//                 e.target.textContent = 'ПЕреглянути менше' : 
//                 e.target.textContent = 'ПЕреглянути більше';
//         })
//     })
// }

// moreInfoInit()

// productCategory.addEventListener('click', (e) => {
//     const target = e.target

//     if (target.classList.contains('product_category__item')) {
//         productCategoryItem.forEach(category => category.classList.remove('active'))
//         target.classList.add('active')

//         getItems(target.dataset.slug)
//         //history.pushState(null, null, `/?slug=${target.dataset.slug}`)\
//     }
// })

// linksCategory.forEach(link => {
//     link.addEventListener('click', () => {
//         productCategoryItem.forEach(category => category.classList.remove('active'))
//         const activeCategory = productCategory.querySelector(`[data-slug="${link.dataset.slug}"]`)
//         activeCategory.classList.add('active')

//         getItems(link.dataset.slug)
//     })
// })

// function getItems(slug) {
//     fetch(`/api/items/?slug=${slug}`)
//         .then(response => response.json())
//         .then(items => {
//             productCardContainer.textContent = ''
//             items.forEach(item => {
//                 productCardContainer.append(itemsCard(item))
//             })

//             let newProductSwiper = new Swiper(".product_card__img", {
//                 init: false,
//                 enabled: false,
//                 slidesPerView: '1',
//                 // width: '330',
//                 navigation: {
//                     nextEl: ".description-button-next",
//                     prevEl: ".description-button-prev",
//                 },
//             });

//             if (newProductSwiper.length) {
//                 product_description_swiper = newProductSwiper
//             } else {
//                 product_description_swiper = []
//                 product_description_swiper.push(newProductSwiper)
//             }

//             let newAdvancesSwiper = new Swiper(".description_advances", {
//                 slidesPerView: '4',
//                 speed: 1000,
//                 init: false,
//                 autoplay: {
//                     delay: 2000,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true
//                 },
//             });

//             if (newAdvancesSwiper.length) {
//                 description_advances_var = newAdvancesSwiper
//             } else {
//                 description_advances_var = []
//                 description_advances_var.push(newAdvancesSwiper)
//             }

//             initModalOpen()
//             products_swiper.update()
//             initProductDetails()
//             moreInfoInit()
//             countInit()
//         })
// }

// function itemsCard({
//     id,
//     title,
//     image_url,
//     advantages,
//     item_features,
//     image_instances,
//     price,
//     short_description
// }) {
//     const card = document.createElement('div')
//     card.classList.add('swiper-slide', 'product_card')
//     card.dataset.id = id

//     const advantages_container = advantages.map(advantage => {
//         return `<div class="description_advances__item swiper-slide">
//             <img src="${advantage.image_url}" alt="">
//         </div>`
//     }).join(' ')

//     const first_table = item_features.filter((item_feature, index) => index <= 3).map((item_feature) => {
//         return `<tr>
//             <td class="item_key">
//                 ${item_feature.feature.title}
//             </td>
//             <td class="item_value">
//                 ${item_feature.feature_value.title}
//             </td>
//         </tr>`
//     }).join(' ')

//     const second_table = item_features.filter((item_feature, index) => index > 3).map((item_feature) => {
//         return `<tr>
//             <td class="item_key">
//                 ${item_feature.feature.title}
//             </td>
//             <td class="item_value">
//                 ${item_feature.feature_value.title}
//             </td>
//         </tr>`
//     }).join(' ')

//     const description_more_info = second_table.length ? `<div class="description_more-info">
//         ПЕреглянути більше
//     </div>` : '';

//     const image_instances_container = image_instances.map(image => {
//         return `<div class="swiper-slide product-slide">
//             <img src="${image.image_url}" alt="${image.image_alt}" loading="lazy">
//         </div>`
//     }).join(' ')

//     card.innerHTML = `
//         <div class="product_card__top">
//             <div class="product_card__img swiper-container">
//                 <div class="swiper-wrapper">
//                     <div class="swiper-slide product-slide">
//                         <img src="${image_url}" alt="">
//                     </div>
//                     ${image_instances_container}
//                 </div>
//                 <div class="swiper-button-prev description-button-prev"></div>
//                 <div class="swiper-button-next description-button-next"></div>
//             </div>
//             <div class="product_card__title">
//                 ${title}
//             </div>
//             <div class="product_card__btn absolute_center">
//                 <button class="btn_1 product_btn_details">ДЕТАЛЬНІШЕ</button>
//                 <button class="btn_2 modal_open buy_btn" data-href="quckly_shop">КУПИТИ</button>
//             </div>
//         </div>
//         <div class="product_card_description">
//             <div class="product_card_description__top">
//                 <div class="product_card_description__title">
//                     SPECIFICATIONS
//                 </div>
//                 <div class="product_card_description_close">
//                     ✖
//                 </div>
//             </div>
//             <div class="description_buy">
//                 <div class="count__block">
//                     <div class="count_minus"></div>
//                     <input type="number" value="1" class="count_input bold_title bold_title_1 color_black" readonly>
//                     <div class="count_plus"></div>
//                 </div>
//                 <div class="product_all_sum" data-price="${price}">
//                     ${price}
//                 </div>
//                 <button class="btn_3 modal_open buy_btn" data-href="quckly_shop">КУПИТИ</button>
//             </div>
//             <div class="swiper-container description_advances">
//                 <div class="swiper-wrapper">
//                     ${advantages_container}
//                 </div>
//             </div>
//             <div class="description_text"> 
//                 <div class="description_text__1">
//                     ${title}
//                 </div>
//                 <div>
//                     ${short_description}
//                 </div>
//             </div>
//             <div class="description_table">
//                 <table>
//                     ${first_table}
//                 </table>
//                 <table class="table_more">
//                    ${second_table}
//                 </table>
//             </div>
//             ${description_more_info}
//         </div>
//     `

//     return card
// }

// function initProductDetails() {
//     document.querySelectorAll('.product_btn_details').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const card = btn.closest('.product_card')
//             // card.querySelector('.product_card_description').classList.add('active')
//             card.classList.add('active')
//             products_swiper.disable()
//             // product_description_swiper.forEach(swiper => swiper.init())
//             const this_swiper = card.querySelector('.product_card__img')

//             product_description_swiper.forEach(swiper => {
//                 swiper.init()
//                 if (swiper.el === this_swiper) {
//                     swiper.enable()
//                     return
//                 }
//             })
//             setTimeout(() => {
//                 description_advances_var.forEach(swiper => swiper.init())
//                 description_advances_var.forEach(swiper => swiper.update())
//             }, 1000)
//         })
//     })

//     document.querySelectorAll('.product_card_description_close').forEach(close => {
//         close.addEventListener('click', () => {
//             // close.closest('.product_card_description').classList.remove('active')
//             const card = close.closest('.product_card')
//             card.classList.remove('active')

//             if (!document.getElementsByClassName('product_card active').length) {
//                products_swiper.enable()
//             }
           
//             const this_swiper = card.querySelector('.product_card__img')
//             product_description_swiper.forEach(swiper => {
//                 if (swiper.el === this_swiper) {
//                     swiper.disable()
//                     return
//                 }
//             })
//         })
//     })
// }

//initProductDetails()
