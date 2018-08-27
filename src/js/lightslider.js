export default function lightSliderInit() {
  const lightSlider = document.querySelector("#light");

  let lightSliderSide = "right";

  lightSlider.addEventListener("input", event => {
    const val = event.target.value;
    const mid = 25;

    if (val > mid && lightSliderSide == "right") {
      lightSliderSide = "left";
      document.querySelector("#label-light").classList.remove("isRight");
      document.querySelector("#label-light").classList.remove("small-sun");
      document.querySelector("#label-light").classList.add("isLeft");
      document.querySelector("#label-light").classList.add("big-sun");
    } else if (val < mid && lightSliderSide == "left") {
      lightSliderSide = "right";
      document.querySelector("#label-light").classList.remove("isLeft");
      document.querySelector("#label-light").classList.remove("big-sun");
      document.querySelector("#label-light").classList.add("isRight");
      document.querySelector("#label-light").classList.add("small-sun");
    }
  });
}
