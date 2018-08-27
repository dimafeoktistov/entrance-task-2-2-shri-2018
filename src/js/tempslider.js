export default function tempSliderInit() {
  const tempSlider = document.querySelector("#tempSlider");

  let tempLabelSide = "right";

  document.querySelector("#label-temp").textContent = "+" + tempSlider.value;
  tempSlider.addEventListener("input", event => {
    const val = event.target.value;
    const mid = 10;
    if (val <= 0) {
      document.querySelector("#label-temp").textContent = val;
    } else {
      document.querySelector("#label-temp").textContent = `+${val}`;
    }

    if (val > mid && tempLabelSide == "right") {
      tempLabelSide = "left";
      document.querySelector("#label-temp").classList.remove("isRight");
      document.querySelector("#label-temp").classList.add("isLeft");
    } else if (val < mid && tempLabelSide == "left") {
      tempLabelSide = "right";
      document.querySelector("#label-temp").classList.remove("isLeft");
      document.querySelector("#label-temp").classList.add("isRight");
    }
  });
}
