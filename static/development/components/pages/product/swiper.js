import Swiper, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

export const reviewsSwiper = new Swiper(".reviews-swiper", {
  modules: [Autoplay],
  slidesPerView: 3,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },

  //     830: {
  //       slidesPerView: 2,
  //     },

  //     1150: {
  //       slidesPerView: 3,
  //     },
  //   },
});
