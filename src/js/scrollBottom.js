export default function scrollBottom() {
  const scrollBottom = document.getElementById("scrollBottom");
  const scrollBottomBtn = document.getElementById("scrollBottomBtn");

  scrollBottom.addEventListener("scroll", event => {
    if (screen.width > 768) {
      let scrollPosition = event.target.scrollTop;

      if (scrollPosition === 0) {
        scrollBottomBtn.style = "display: block";
      } else {
        scrollBottomBtn.style = "display: none";
      }
    }
  });
}
