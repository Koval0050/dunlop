import "./cart";
import "./index.scss";
import "./header-new.scss";
import "./cart.scss";

const hamburger = document.querySelector("#hamburger");
const header = document.querySelector(".header");

hamburger.addEventListener("click", () => header.classList.toggle("active"));

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  const help = document.querySelector(".help");
  if (help) {
    if (prevScrollpos > currentScrollPos) {
      help.classList.remove("active");
    } else {
      help.classList.add("active");
    }
  }
  prevScrollpos = currentScrollPos;
};
