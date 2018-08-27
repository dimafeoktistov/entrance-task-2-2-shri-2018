export default function advancer() {
  const main = document.getElementById("main");
  const style = main.currentStyle || window.getComputedStyle(main);

  function determineOverflow(content, container) {
    let containerMetrics = container.getBoundingClientRect();
    let containerMetricsRight = Math.floor(containerMetrics.right);
    let containerMetricsLeft = Math.floor(containerMetrics.left);
    let contentMetrics = content.getBoundingClientRect();
    let contentStart = Math.floor(contentMetrics.left);
    let contentRealWidth = content.scrollWidth;
    let contentMetricsRight =
      contentRealWidth -
      parseInt(content.scrollLeft) +
      parseInt(style.marginLeft) -
      1;
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

  // document.documentElement.classList.remove("no-js");
  // document.documentElement.classList.add("js");

  let fvDevices = document.getElementById("fvDevices");
  let fvDevicesContents = document.getElementById("fvDevicesContents");

  // Handle the scroll of the horizontal container
  let last_known_scroll_position = 0;
  let ticking = false;

  let paginationLeft = document.getElementById("paginationLeft");
  let paginationRight = document.getElementById("paginationRight");

  if (determineOverflow(fvDevicesContents, fvDevices) === "right") {
    paginationLeft.classList.remove("pagination-left");
    paginationRight.classList.remove("pagination-right");
    paginationRight.classList.add("pagination-right");
  } else if (determineOverflow(fvDevicesContents, fvDevices) === "left") {
    paginationRight.classList.remove("pagination-right");
    paginationLeft.classList.remove("pagination-left");
    paginationLeft.classList.add("pagination-left");
  } else if (determineOverflow(fvDevicesContents, fvDevices) === "both") {
    paginationLeft.classList.remove("pagination-right");
    paginationLeft.classList.remove("pagination-left");
    paginationRight.classList.add("pagination-right");
    paginationLeft.classList.add("pagination-left");
  }

  function doSomething(lastScrollPos) {
    if (determineOverflow(fvDevicesContents, fvDevices) === "right") {
      paginationLeft.classList.remove("pagination-left");
      paginationRight.classList.remove("pagination-right");
      paginationRight.classList.add("pagination-right");
    } else if (determineOverflow(fvDevicesContents, fvDevices) === "left") {
      paginationRight.classList.remove("pagination-right");
      paginationLeft.classList.remove("pagination-left");
      paginationLeft.classList.add("pagination-left");
    } else if (determineOverflow(fvDevicesContents, fvDevices) === "both") {
      paginationLeft.classList.remove("pagination-right");
      paginationLeft.classList.remove("pagination-left");
      paginationRight.classList.add("pagination-right");
      paginationLeft.classList.add("pagination-left");
    }
  }

  fvDevicesContents.addEventListener("scroll", function() {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });

  const SETTINGS = {
    travelling: false,
    direction: "",
    distance: 150
  };

  paginationLeft.addEventListener("click", function() {
    // If we have content overflowing both sides or on the left
    if (
      determineOverflow(fvDevicesContents, fvDevices) === "left" ||
      determineOverflow(fvDevicesContents, fvDevices) === "both"
    ) {
      let availableScrollLeft = fvDevicesContents.scrollLeft;
      // If the space available is less than two lots of our desired distance, just move the whole amount
      // otherwise, move by the amount in the settings
      if (availableScrollLeft < SETTINGS.distance * 2) {
        fvDevicesContents.style.transform =
          "translateX(" + availableScrollLeft + "px)";
      } else {
        fvDevicesContents.style.transform =
          "translateX(" + SETTINGS.distance + "px)";
      }
      fvDevicesContents.classList.remove("devices-no-transition");
      SETTINGS.direction = "left";
      SETTINGS.travelling = true;
    }
  });

  paginationRight.addEventListener("click", function() {
    // If in the middle of a move return
    if (SETTINGS.travelling === true) {
      return;
    }
    // If we have content overflowing both sides or on the right
    if (
      determineOverflow(fvDevicesContents, fvDevices) === "right" ||
      determineOverflow(fvDevicesContents, fvDevices) === "both"
    ) {
      // Get the right edge of the container and content
      let navBarRightEdge = fvDevices.getBoundingClientRect().right;
      let navBarScrollerRightEdge =
        fvDevicesContents.scrollWidth -
        fvDevicesContents.scrollLeft +
        parseInt(style.marginLeft);
      // Now we know how much space we have available to scroll
      let availableScrollRight = Math.floor(
        navBarScrollerRightEdge - navBarRightEdge
      );
      // If the space available is less than two lots of our desired distance, just move the whole amount
      // otherwise, move by the amount in the settings
      if (availableScrollRight < SETTINGS.distance * 2) {
        fvDevicesContents.style.transform =
          "translateX(-" + availableScrollRight + "px)";
      } else {
        fvDevicesContents.style.transform =
          "translateX(-" + SETTINGS.distance + "px)";
      }
      // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
      fvDevicesContents.classList.remove("devices-no-transition");
      // Update our settings
      SETTINGS.direction = "right";
      SETTINGS.travelling = true;
    }
  });

  fvDevicesContents.addEventListener(
    "transitionend",
    () => {
      // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
      let styleOfTransform = window.getComputedStyle(fvDevicesContents, null);
      let tr =
        styleOfTransform.getPropertyValue("-webkit-transform") ||
        styleOfTransform.getPropertyValue("transform");
      // If there is no transition we want to default to 0 and not null
      let amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
      fvDevicesContents.style.transform = "none";
      fvDevicesContents.classList.add("devices-no-transition");
      // Now lets set the scroll position
      if (SETTINGS.direction === "left") {
        fvDevicesContents.scrollLeft = fvDevicesContents.scrollLeft - amount;
      } else {
        fvDevicesContents.scrollLeft = fvDevicesContents.scrollLeft + amount;
      }
      SETTINGS.travelling = false;
    },
    false
  );
}
