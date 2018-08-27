export default function circularSlider(options) {
  let mouseDown = false;

  const value = document.querySelector(".floor-temp");
  const valueBig = document.querySelector(".floor-temp-big");

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const progressMeter = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressMeter.setAttribute("class", "progress__meter");
  progressMeter.setAttribute("cx", 110);
  progressMeter.setAttribute("cy", 110);
  progressMeter.setAttribute("r", options.radius - 6);
  progressMeter.setAttribute("stroke-width", 20);

  const progressMeter1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressMeter1.setAttribute("class", "progress__dashes");
  progressMeter1.setAttribute("cx", 110);
  progressMeter1.setAttribute("cy", 110);
  progressMeter1.setAttribute("r", options.radius - 6);
  progressMeter1.setAttribute("stroke-width", 19);

  const progressValue = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  progressValue.setAttribute("class", "progress__value");
  progressValue.setAttribute("cx", 110);
  progressValue.setAttribute("cy", 110);
  progressValue.setAttribute("r", options.radius - 6);
  progressValue.setAttribute("stroke-width", 19);
  progressValue.style.stroke = options.color;

  const input = document.createElement("input");
  input.setAttribute("type", "range");
  input.setAttribute("id", "control");
  input.setAttribute("name", "points");
  input.setAttribute("min", options.range[0]);
  input.setAttribute("max", options.range[1]);
  input.setAttribute("step", options.step);
  input.setAttribute("value", 10);
  input.addEventListener("input", () => {
    this.progress(input.valueAsNumber);
  });

  value.textContent = input.value - 10;
  valueBig.textContent = input.value - 10;

  group.appendChild(progressMeter1);
  group.appendChild(progressValue);
  group.appendChild(progressMeter);

  options.container.appendChild(group);

  this.handleInput = () => {
    group.addEventListener("mouseup", e => {
      group.style.zIndex = "0";
      mouseDown = false;
    });
    group.addEventListener("touchend", e => {
      group.style.zIndex = "0";
      mouseDown = false;
    });
    group.addEventListener("mousedown", e => {
      group.style.zIndex = "123";
      mouseDown = true;
    });
    group.addEventListener("touchstart", e => {
      group.style.zIndex = "123";
      mouseDown = true;
    });
    progressMeter.addEventListener("click", this.update);
    progressValue.addEventListener("click", this.update);
    document.addEventListener("mousemove", this.update);
    document.addEventListener("mouseup", () => {
      mouseDown = false;
    });
    document.addEventListener("touchmove", this.update, { passive: false });
  };

  this.update = e => {
    if (e.type != "click") {
      if (!mouseDown || options.range[1] == 0) return;
      this.move(e);
    } else {
      this.move(e);
    }
  };

  this.move = e => {
    let position;
    if (
      e.type == "mouseup" ||
      e.type == "mousedown" ||
      e.type == "mousemove" ||
      e.type == "click"
    ) {
      position = { x: e.pageX, y: e.pageY };
    } else if (
      e.type == "touchend" ||
      e.type == "touchstart" ||
      e.type == "touchmove"
    ) {
      e.preventDefault();
      position = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    const coords = {
      x: position.x - group.getBoundingClientRect().left,
      y: position.y - group.getBoundingClientRect().top
    };
    const atan = Math.atan2(
      coords.x - options.radius,
      coords.y - options.radius
    );
    const deg = Math.ceil(-atan / (Math.PI / 180) + 180);

    let points = Math.ceil((deg * options.range[1]) / 360);

    var x =
      Math.ceil((options.radius - 5) * Math.sin((deg * Math.PI) / 180)) +
      options.radius +
      "px";
    var y =
      Math.ceil((options.radius - 5) * -Math.cos((deg * Math.PI) / 180)) +
      options.radius +
      "px";

    input.value = points;

    if (points - 10 <= 0) {
      value.textContent = points - 10;
      valueBig.textContent = points - 10;
    } else {
      value.textContent = `+${points - 10}`;
      valueBig.textContent = `+${points - 10}`;
    }
    this.progress(input.value);
  };

  this.progress = value => {
    progressValue.style.strokeDasharray = 2 * Math.PI * (options.radius - 6);
    const progress = value / options.range[1];
    const dashoffset = 2 * Math.PI * (options.radius - 6) * (1 - progress);
    progressValue.style.strokeDashoffset = dashoffset;
  };

  this.progress(input.value);
}
