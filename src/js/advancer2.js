export default function scenariosAdvancer() {
  function determineOverflow(content, container) {
    let containerMetrics = container.getBoundingClientRect();
    let containerMetricsRight = Math.floor(containerMetrics.width);
    let containerMetricsLeft = Math.floor(containerMetrics.left);
    let contentMetrics = content.getBoundingClientRect();
    let contentStart = Math.floor(contentMetrics.left);
    let contentRealWidth = content.scrollWidth;
    let contentMetricsRight = contentRealWidth - content.scrollLeft;
    let contentMetricsLeft = contentStart - content.scrollLeft;
    if (
      containerMetricsLeft > contentMetricsLeft &&
      containerMetricsRight < contentMetricsRight
    ) {
      return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
      return "left";
    } else if (contentMetricsRight > containerMetricsRight) {
      return "right";
    } else {
      return "none";
    }
  }

  let fvScenarios = document.getElementById("fvScenarios");
  let fvScenariosContents = document.getElementById("fvScenariosContents");

  // Handle the scroll of the horizontal container
  let last_known_scroll_position = 0;
  let ticking = false;

  let paginationLeft = document.getElementById("paginationScenariosLeft");
  let paginationRight = document.getElementById("paginationScenariosRight");

  if (determineOverflow(fvScenariosContents, fvScenarios) === "right") {
    paginationLeft.classList.remove("pagination-left");
    paginationRight.classList.remove("pagination-right");
    paginationRight.classList.add("pagination-right");
  } else if (determineOverflow(fvScenariosContents, fvScenarios) === "left") {
    paginationRight.classList.remove("pagination-right");
    paginationLeft.classList.remove("pagination-left");
    paginationLeft.classList.add("pagination-left");
  } else if (determineOverflow(fvScenariosContents, fvScenarios) === "both") {
    paginationLeft.classList.remove("pagination-right");
    paginationLeft.classList.remove("pagination-left");
    paginationRight.classList.add("pagination-right");
    paginationLeft.classList.add("pagination-left");
  }

  function doSomething(lastScrollPos) {
    if (determineOverflow(fvScenariosContents, fvScenarios) === "right") {
      paginationLeft.classList.remove("pagination-left");
      paginationRight.classList.remove("pagination-right");
      paginationRight.classList.add("pagination-right");
    } else if (determineOverflow(fvScenariosContents, fvScenarios) === "left") {
      paginationRight.classList.remove("pagination-right");
      paginationLeft.classList.remove("pagination-left");
      paginationLeft.classList.add("pagination-left");
    } else if (determineOverflow(fvScenariosContents, fvScenarios) === "both") {
      paginationLeft.classList.remove("pagination-right");
      paginationLeft.classList.remove("pagination-left");
      paginationRight.classList.add("pagination-right");
      paginationLeft.classList.add("pagination-left");
    }
  }

  fvScenariosContents.addEventListener("scroll", function() {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });

  const distance = 640;
  let direction = "right";

  paginationLeft.addEventListener("click", function() {
    if (
      determineOverflow(fvScenariosContents, fvScenarios) === "left" ||
      determineOverflow(fvScenariosContents, fvScenarios) === "both"
    ) {
      fvScenariosContents.style.transform = "translateX(" + distance + "px)";
      fvScenariosContents.classList.remove("devices-no-transition");
    }

    direction = "left";
  });

  paginationRight.addEventListener("click", function() {
    if (
      determineOverflow(fvScenariosContents, fvScenarios) === "right" ||
      determineOverflow(fvScenariosContents, fvScenarios) === "both"
    ) {
      fvScenariosContents.style.transform = "translateX(" + distance + "px)";
    }

    fvScenariosContents.classList.remove("devices-no-transition");

    direction = "right";
  });

  fvScenariosContents.addEventListener(
    "transitionend",
    () => {
      // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
      let styleOfTransform = window.getComputedStyle(fvScenariosContents, null);
      let tr =
        styleOfTransform.getPropertyValue("-webkit-transform") ||
        styleOfTransform.getPropertyValue("transform");
      // If there is no transition we want to default to 0 and not null
      let amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
      fvScenariosContents.style.transform = "none";
      fvScenariosContents.classList.add("devices-no-transition");
      // Now lets set the scroll position
      if (direction === "left") {
        fvScenariosContents.scrollLeft =
          fvScenariosContents.scrollLeft - amount;
      } else {
        fvScenariosContents.scrollLeft =
          fvScenariosContents.scrollLeft + amount;
      }
    },
    false
  );
}
