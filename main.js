const linksWrapper = document.querySelector(".primary-nav__links");
const links = document.querySelectorAll(".primary-nav__link");

const ACTIVE_CLASS = "primary-nav__link--active";

const { width, right, left } = links[0].getBoundingClientRect();
const { left: wrapperLeft } = linksWrapper.getBoundingClientRect();

const updateWidth = (width) => {
   linksWrapper.style.setProperty("--underline-width", `${width}px`);
};
const updateLeft = (left) => {
   linksWrapper.style.setProperty("--underline-left", `${left}px`);
};

updateWidth(width);
updateLeft(left - wrapperLeft);

setTimeout(() => {
   linksWrapper.style.setProperty("--underline-transition-duration", "200ms");
}, 0);

let prevLinkIndex = 0;

links.forEach((link, linkIndex) => {
   link.addEventListener("click", () => {
      if (prevLinkIndex === linkIndex) {
         return;
      }
      links.forEach((link) => link.classList.remove(ACTIVE_CLASS));
      link.classList.add(ACTIVE_CLASS);
      const prevLink = links[prevLinkIndex];
      const { left: prevLeft, right: prevRight } = prevLink.getBoundingClientRect();
      const { width, left, right } = link.getBoundingClientRect();
      const { left: wrapperLeft } = linksWrapper.getBoundingClientRect();
      const isForwardNavigation = linkIndex > prevLinkIndex;
      if (isForwardNavigation) {
         updateWidth(right - prevLeft);
      } else {
         updateWidth(prevRight - left);
         updateLeft(left - wrapperLeft);
      }
      setTimeout(() => {
         updateWidth(width);
         if (isForwardNavigation) {
            updateLeft(left - wrapperLeft);
         }
      }, 150);
      prevLinkIndex = linkIndex;
   });
});
