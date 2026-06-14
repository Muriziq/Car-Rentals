export default function menuBar(){
      const mobileMenu = document.querySelector("header nav");

  document.querySelector(".menu-btn").addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const links = mobileMenu.querySelectorAll("a");
    if (mobileMenu.classList.contains("active")) {
      gsap.fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1 });
    } else {
      gsap.fromTo(links, { opacity: 1, y: 0 }, { opacity: 0, y: 20, stagger: 0.1 });
    }
  });
}