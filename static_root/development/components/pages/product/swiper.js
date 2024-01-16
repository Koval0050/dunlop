import Swiper, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

export const mediaSwiper = new Swiper(".media-swiper", {
  modules: [Autoplay],
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    550: {
      slidesPerView: 2,
    },
  },
});

export const reviewsSwiper = new Swiper(".reviews-swiper", {
  modules: [Autoplay],
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    830: {
      slidesPerView: 2,
    },

    1150: {
      slidesPerView: 3,
    },
  },
});
