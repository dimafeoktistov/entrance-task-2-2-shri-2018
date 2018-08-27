import "./scss/main.scss";
import stickybits from "stickybits";
import dragscroll from "./js/dragscroll";
import circularSlider from "./js/slider";
import modals from "./js/modals";
import scrollBottom from "./js/scrollBottom";
import advancer from "./js/advancer";
import scenariosAdvancer from "./js/advancer2";
import tempSliderInit from "./js/tempslider";
import lightSliderInit from "./js/lightslider";
import mobileMenu from "./js/menu";

function addSlider() {
  const svg = document.querySelector(".slider");

  const slider1 = new circularSlider({
    container: svg,
    color: "#d3ab0b",
    range: [0, 40],
    step: 1,
    radius: 100
  });
  slider1.handleInput();
}

addSlider();
modals();
scrollBottom();
advancer();
scenariosAdvancer();
tempSliderInit();
lightSliderInit();
mobileMenu();
stickybits(".header");
