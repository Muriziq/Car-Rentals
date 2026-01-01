// =========================
// Register GSAP ScrollTrigger plugin
// =========================
gsap.registerPlugin(ScrollTrigger);

// =========================
// Page Load Animations
// Animate header, search bar, and sections when page loads
// =========================
function pageAnimation() {
  const ftl = gsap.timeline();

  // Fade in background image
  ftl.from(".background-image", {opacity:0, duration:2, ease:"power2.inOut"});

  // Animate header text in from left
  ftl.from(".header-text h1", {x:-200, opacity:0, duration:1}, "-=1");

  // Animate header paragraph slightly from below
  ftl.from(".header-text p", {y:10, opacity:0, duration:0.5}, "-=0.3");

  // Fade in search bar
  ftl.from(".search-place", {opacity:0, duration:0.5});

  // Animate pickup options staggered
  ftl.from(".pickup", {y:15, opacity:0, stagger:0.2});

  // Animate "choose" section items
  ftl.from(".choose > div", {opacity:0, duration:1}, "-=0.3");

  const headerHeight = document.querySelector("header").offsetHeight;

  // =========================
  // Scroll-triggered header animation
  // Parallax effect for background, header text, and search bar
  // =========================
  const ftl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".background",
      start: `top+=${headerHeight} top`,
      end: "bottom top",
      scrub: true
    }
  });

  ftl2.fromTo(".background-image", {y:0, opacity:1}, {y:-100, opacity:0});
  ftl2.fromTo(".header-text", {y:0}, {y:-200}, "<");
  ftl2.fromTo(".search-place", {y:0}, {y:-200}, "<");

  // Animate "choose" section elements individually as they scroll into view
  gsap.utils.toArray(".choose > section > div").forEach(div => {
    gsap.from(div, {
      y:150, 
      opacity:0, 
      duration:0.5,
      scrollTrigger: {trigger: div, start:"top 90%", end:"bottom 60%", scrub:true}
    });
  });

  // Animate "works" section text and divs on scroll
  gsap.from(".works > section p", {
    y:100, 
    opacity:0,
    scrollTrigger: {
      trigger: ".works > section",
      start: "top bottom",
      end: "bottom 110%",
      scrub:true
    },
    stagger: 0.2
  });

  const wrks = gsap.timeline({
    scrollTrigger: {
      trigger: ".works",
      start: "top top",
      end: "bottom top",
      scrub:true
    }
  });
  wrks.fromTo(".works", {y:0, opacity:1}, {y:-100, opacity:0});
  wrks.fromTo(".works > div", {y:0, opacity:1}, {y:-200, opacity:0}, "<");
  wrks.fromTo(".works > section", {y:0}, {y:-230}, "<");

  // Animate "offs" section divs as they scroll into view
  gsap.from(".offs > div", {
    y:100,
    opacity:0,
    scrollTrigger: {trigger: ".offs", start:"top bottom", end:"bottom 80%", scrub:true},
    stagger:0.5
  });

  // Animate contact form input fields on scroll
  gsap.utils.toArray(".forms > section > div:last-of-type > div").forEach(div => {
    gsap.from(div, {
      y:100,
      opacity:0,
      duration:0.5,
      scrollTrigger: {trigger: div, start:"top 90%"}
    });
  });

  // Fade out contact section on scroll
  const formt = gsap.timeline({
    scrollTrigger: {
      trigger: ".forms",
      start: "top top",
      end: "bottom top",
      scrub:true
    }
  });
  formt.fromTo(".forms", {y:0, opacity:1}, {y:-150, opacity:0});
}

// =========================
// Login/Signup Form Animations
// =========================
function loginPageAnimation(type) {
  if(type === "login") {
    const lgnt = gsap.timeline();
    // Animate login modal in
    lgnt.fromTo(".login", {y:200, opacity:0}, {y:0, duration:1, opacity:1});
    // Animate input fields staggered
    lgnt.from(".logininput", {y:100, opacity:0}, {y:0, duration:1, opacity:1, stagger:0.2}, "-=0.5");
  } else {
    // Animate signup modal in
    gsap.fromTo(".signup", {y:200, opacity:0}, {y:0, duration:1, opacity:1});
  }
}

// Run initial page animations
pageAnimation();

// =========================
// Auto-toggle images slider
// Cycles through images every 2 seconds and updates opacity of toggle indicators
// =========================
const toggleImages = [
  "e20722ac82f89475d007724640dcfb61999ddfea.jpg",
  "Lamborghini-Revuelto-Front-Centre.jpg",
  "Ps-Blog-23.jpg"
];

const toggleImage = document.querySelector(".ofssarticle > section img");
let toggleStart = 0;

// Set initial image
toggleImage.src = `images/${toggleImages[toggleStart]}`;

setInterval(() => {
  // Move to next image
  toggleStart = (toggleStart + 1) % toggleImages.length;
  toggleImage.src = `images/${toggleImages[toggleStart]}`;

  // Update toggle indicators opacity
  document.querySelectorAll(".toggle-row div").forEach((toggle, index) => {
    toggle.style.opacity = (index === toggleStart) ? 0.5 : 1;
  });
}, 2000);



// =========================
// Smooth scrolling for header links
// When a header link is clicked, prevent default jump and scroll smoothly to the section
// =========================
document.querySelectorAll('header a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// =========================
// Mobile menu toggle
// Opens/closes the mobile menu and animates links using GSAP
// =========================
const mobileMenu = document.querySelector("header nav");

document.querySelector(".menu-btn").addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const links = mobileMenu.querySelectorAll("a");
    
    if(mobileMenu.classList.contains("active")){
        // Animate links in when menu opens
        gsap.fromTo(links, {opacity:0, y:20}, {opacity:1, y:0, stagger:0.1});
    } else {
        // Animate links out when menu closes
        gsap.fromTo(links, {opacity:1, y:0}, {opacity:0, y:20, stagger:0.1});
    }
});

// =========================
// Show rental cars section
// Triggered when "categories" button is clicked
// =========================
document.querySelector(".categories > button").addEventListener("click", () => {
    document.querySelector(".rental-car").style.display = "grid";
    gsap.fromTo(".rental-car", {opacity:0, y:200}, {opacity:1, y:0, duration:0.5});
});

// =========================
// Show login modal
// Triggered when login button in header is clicked
// =========================
document.querySelector("header > button").addEventListener("click", () => {
    document.querySelector(".login-page").style.display = "grid";
    document.querySelector(".login").style.display = "flex";
    document.querySelector(".signup").style.display = "none";
    loginPageAnimation("login"); // animate login form
});

// =========================
// Close modals (login/signup & rental-car)
// Triggered when elements with "cancel" class are clicked
// =========================
document.querySelectorAll(".cancel").forEach(cancel => {
  cancel.addEventListener("click", () => {
    // Animate forms out using GSAP, then hide them
    const cancelPromise = new Promise(resolve => {
      gsap.to(".login", {y: 200, opacity: 0, duration: 0.5});
      gsap.to(".signup", {y: 200, opacity: 0, duration: 0.5, onComplete: resolve});
    });

    cancelPromise.then(() => {
      document.querySelector(".login-page").style.display = "none";
      document.querySelector(".rental-car").style.display = "none";
    });
  });
});

// =========================
// Switch to signup form
// Triggered by "forget" button inside login modal
// =========================
document.querySelector(".forget button").addEventListener("click", () => {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".signup").style.display = "flex";
    loginPageAnimation("signup"); // animate signup form
});

// =========================
// Switch back to login form
// Triggered by paragraph inside signup form
// =========================
document.querySelector(".signup > p").addEventListener("click", () => {
    document.querySelector(".login").style.display = "flex";
    document.querySelector(".signup").style.display = "none";
    loginPageAnimation("login"); // animate login form
});

// =========================
// Toggle password visibility
// Triggered by "see" icons next to password fields
// =========================
document.querySelectorAll(".see").forEach((see, i) => {
  see.addEventListener("click", () => {
    const seeInput = document.querySelectorAll(".seePass")[i];
    if(seeInput.type === "password"){
      seeInput.type = "text";
      see.src = "images/Vector.svg"; // change icon to "visible"
    } else {
      seeInput.type = "password";
      see.src = "images/Group 1171275009.svg"; // change icon back to "hidden"
    }
  });
});

// =========================
// Focus input when searching for rental place
// Triggered when search button is clicked
// =========================
document.querySelector(".search-place > button").addEventListener("click", () => {
    document.querySelector(".rental-car").style.display = "grid";
    document.querySelector(".rental1 input").focus();
});
