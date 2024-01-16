import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper";
import "swiper/swiper-bundle.css";
import "./index.scss";

Swiper.use([Autoplay, Navigation, Pagination, Scrollbar, Thumbs]);

export const top_swiper = new Swiper(".top_slider_container", {
  slidesPerView: "1",
  // loop: true,
  spaceBetween: 30,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    // pauseOnMouseEnter: true
  },
  navigation: {
    nextEl: ".top-slider-btn-next",
    prevEl: ".top-slider-btn-prev",
  },

  pagination: {
    el: ".top_slider-pagination",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return `<div class="pagination_wrapper"> 
                <span class="currentZero">0</span><span class="${currentClass}"></span> 
                <span class="totalZero">/0</span><span class="${totalClass}"></span> 
            </div>`;
    },
  },

  on: {
    slideChange: ({ activeIndex }) => {
      // initModalMobBtn(activeIndex)
    },
  },
});

// initModalMobBtn(0)

// function initModalMobBtn(index) {
//     const width = document.documentElement.offsetWidth
//     if (width < 1001) {
//         const activeSlide = document.querySelectorAll('.swiper-slide')[index]
//         const mobTitle = document.querySelector('.mob__title')
//         const mobBtnDetails = document.querySelector('.details_btn-mob')
//         const buyMobBtn = document.querySelector('.buy_mob-btn')

//         mobBtnDetails.classList.remove('hidden')
//         buyMobBtn.classList.remove('hidden')

//         let activeSlideTitle = null
//         // let activeBtnDetails = null

//         if (!activeSlide.querySelector('.buy_btn')) {
//             buyMobBtn.classList.add('hidden')
//         }
//         if (!activeSlide.querySelector('.details_btn')) {
//             mobBtnDetails.classList.add('hidden')
//         }

//         if (activeSlide.querySelector('.slider__title')) {
//             activeSlideTitle = activeSlide.querySelector('.slider__title').textContent
//         }
//         // if (activeSlide.querySelector('.details_btn')) {
//         //     activeBtnDetails = activeSlide.querySelector('.details_btn').dataset.href
//         // }

//         mobTitle.textContent = activeSlideTitle
//         // mobBtnDetails.dataset.href = activeBtnDetails
//         initModalOpen()
//     }
// }

const width = document.documentElement.offsetWidth;
if (width < 1001) {
  const pagination = document.querySelector(".top_slider-pagination");
  const paginationMob = document.querySelector(".pagination-mob");

  if (paginationMob) {
    paginationMob.append(pagination);
  }
}

export let products_swiper = new Swiper(".product__slider", {
  slidesPerView: "auto",
  // centeredSlides: false,
  navigation: {
    nextEl: ".product-slider-btn-next",
    prevEl: ".product-slider-btn-prev",
  },

  breakpoints: {
    // 800: {
    //   slidesPerView: "4",
    // },
    // 500: {
    //   slidesPerView: "2",
    // },
    // 300: {
    //   slidesPerView: "1",
    // },
  },

  // pagination: {
  //     el: ".swiper-pagination",
  //     type: "fraction",
  // }
});

let advances_swiper = new Swiper(".advances__items", {
  spaceBetween: 30,
  pagination: {
    el: ".advances-pagination",
    type: "progressbar",
  },
  speed: 1000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    1000: {
      slidesPerView: "9",
    },
    700: {
      slidesPerView: "7",
    },
    500: {
      slidesPerView: "5",
    },
    300: {
      slidesPerView: "3.5",
    },
  },
});

let product_category = new Swiper(".product_category", {
  slidesPerView: "5",
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 20,
  breakpoints: {
    1700: {
      slidesPerView: "5",
    },
    1500: {
      slidesPerView: "4.5",
    },
    1300: {
      slidesPerView: "4",
    },
    1100: {
      slidesPerView: "3.5",
    },
    1000: {
      slidesPerView: "3",
    },
    800: {
      slidesPerView: "2.5",
    },
    600: {
      slidesPerView: "2",
    },
    300: {
      slidesPerView: "1.5",
    },
  },
});

export let product_card__img = new Swiper(".product_card__img", {
  init: false,
  enabled: false,
  slidesPerView: "1",
  // width: '330',
  navigation: {
    nextEl: ".description-button-next",
    prevEl: ".description-button-prev",
  },
});

export let description_advances = new Swiper(".description_advances", {
  // spaceBetween: 30,
  slidesPerView: "4",
  slidesPerGroup: 2,
  // width: '120',
  speed: 1000,
  init: false,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  // init: false,
  // breakpoints: {
  //     1250: {
  //         slidesPerView: '6',
  //     },
  //     1000: {
  //         slidesPerView: '5',
  //     },
  //     400: {
  //         slidesPerView: '4',
  //     },
  //     300: {
  //         slidesPerView: '3',
  //     }
  // }
});

// product_description_swiper.forEach(swiper => {
//     const description_block = swiper.el.closest('.description')
//     const mini = description_block.querySelector('.description_swiper_mini')

//     let product_description_swiper_mini = new Swiper(mini, {
//         slidesPerView: 3,
//         spaceBetween: 20,
//         breakpoints: {
//             500: {
//                 slidesPerView: 3,
//             },
//             300: {
//                 slidesPerView: 2,
//             },
//         },
//     })
//     swiper.thumbs.swiper = product_description_swiper_mini
//     swiper.thumbs.init()
// })
