export default function modals() {
  const lightModal = document.getElementById("lightModal");
  const modalContent = Array.from(document.querySelectorAll(".modalContent"));
  const tempModal = document.getElementById("tempModal");
  const floorModal = document.getElementById("floorModal");
  const bulbBtns = Array.from(document.querySelectorAll(".bulb"));
  const thermoBtns = Array.from(document.querySelectorAll(".thermo"));
  const floorBtns = Array.from(document.querySelectorAll(".floor"));
  const closeModalBtns = Array.from(document.querySelectorAll(".close"));
  const body = document.getElementsByTagName("BODY")[0];

  bulbBtns.forEach(bulbBtn => {
    bulbBtn.addEventListener("click", () => {
      lightModal.style.display = "flex";
      body.classList.add("modalBlur");
      modalContent[0].classList.add("fade-in");
    });
  });

  thermoBtns.forEach(thermoBtn => {
    thermoBtn.addEventListener("click", () => {
      tempModal.style.display = "flex";
      body.classList.add("modalBlur");
      modalContent[1].classList.add("fade-in");
    });
  });

  floorBtns.forEach(floorBtn => {
    floorBtn.addEventListener("click", () => {
      floorModal.style.display = "flex";
      body.classList.add("modalBlur");
      modalContent[2].classList.add("fade-in");
    });
  });

  closeModalBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      modalContent.forEach(content => {
        content.classList.add("fade-out");
      });
      setTimeout(() => {
        modalContent[0].classList.remove("fade-out");
        lightModal.style.display = "none";
      }, 200);
      setTimeout(() => {
        modalContent[1].classList.remove("fade-out");
        tempModal.style.display = "none";
      }, 200);
      setTimeout(() => {
        modalContent[2].classList.remove("fade-out");
        floorModal.style.display = "none";
      }, 200);
      body.classList.remove("modalBlur");
    });
  });

  window.onclick = event => {
    if (event.target == lightModal) {
      lightModal.style.display = "none";
      body.classList.remove("modalBlur");
    } else if (event.target == tempModal) {
      tempModal.style.display = "none";
      body.classList.remove("modalBlur");
    } else if (event.target == floorModal) {
      floorModal.style.display = "none";
      body.classList.remove("modalBlur");
    }
  };
}
