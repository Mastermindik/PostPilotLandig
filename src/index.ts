import "./index.html"
import "./index.scss"
import $ from 'jquery';
import 'slick-carousel';

const steps = document.querySelectorAll(".stepper__item");
steps.forEach((i: Element) => {
  i.addEventListener("click", (e: Event) => {
    const target = e.target as Element;

    if (target.classList.contains("stepper__item--active")) {
      return;
    }

    steps.forEach((j: Element) => j.classList.remove("stepper__item--active"));
    i.classList.add("stepper__item--active");
  });
});

$(".slider").slick({
  slidesToShow: 3,
  arrows: true,
  infinite: true,
  autoplay: true,
})