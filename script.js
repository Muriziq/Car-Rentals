gsap.registerPlugin(ScrollTrigger);

function header() {
  const headerTimeline = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power.inOut",
    },
  });
  headerTimeline.fromTo(
    ".background",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1 }
  );
  const menuBar = document.querySelector(".menu-bar");
  headerTimeline.to(menuBar, { opacity: 1 }, "-=0.8");
  headerTimeline.fromTo(
    menuBar.querySelector("div"),
    { x: -10, opacity: 0 },
    { x: 0, opacity: 1 },
    "-=0.8"
  );
  headerTimeline.fromTo(
    menuBar.querySelector("button"),
    { x: 10, opacity: 0 },
    { x: 0, opacity: 1 },
    "-=0.8"
  );
  headerTimeline.fromTo(
    menuBar.querySelectorAll("a"),
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.2 },
    "-=0.8"
  );
  const headerText = document.querySelector(".header-text").children;
  headerTimeline.fromTo(
    headerText,
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.2 },
    "-=0.8"
  );
  const pickUp = document.querySelector(".pickup");
  const verticalLine = document.querySelector(".vertical-rule");
  headerTimeline.fromTo(
    ".search-place",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1 },
    "-=0.8"
  );
}
function choose() {
  const choose = document.querySelector(".choose");
  const chooseDiv = choose.querySelector("div");
  const chooseSec = choose.querySelector("section");
  gsap.fromTo(
    chooseDiv.querySelector("h2"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: choose,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
    }
  );
  gsap.fromTo(
    chooseDiv.querySelector("p"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: choose,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
    }
  );
  gsap.fromTo(
    Array.from(chooseSec.querySelectorAll("div")),
    { x: -20, y: 100, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      ease: "power.inOut",
      scrollTrigger: {
        trigger: chooseSec,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
      stagger: 0.2,
    }
  );
}
function works() {
  const works = document.querySelector(".works");
  const worksDiv = works.querySelector("div");
  const worksSec = works.querySelector("section");
  const worksTimeline = gsap.timeline({
    defaults: { ease: "power.inOut" },
    scrollTrigger: {
      trigger: works,
      toggleActions: "play pause resume none",
      start: "top 80%",
      end: "bottom top",
    },
  });
  worksTimeline.fromTo(
    worksDiv.querySelector("img"),
    { opacity: 0, width: "20%", height: "20%" },
    { opacity: 1, width: "100%", height: "100%", duration: 3 }
  );
  worksTimeline.fromTo(
    worksSec.querySelector("h2"),
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1 },
    "-=2.5"
  );
  worksTimeline.fromTo(
    worksSec.querySelectorAll("div"),
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.3 },
    "-=2"
  );
  worksTimeline.fromTo(
    worksSec.querySelector("button"),
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, ease: "power2.inOut" },
    "-=0.2"
  );
}
function rent() {
  const rent = document.querySelector(".rent");
  const categories = document.querySelector(".categories");
  const buy = document.querySelector(".buy");
  const rentDiv = rent.querySelector("div");
  gsap.fromTo(
    Array.from(rentDiv.querySelectorAll("h2 , p")),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: rent,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
    }
  );
  const categoriesTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: rent,
      toggleActions: "play pause resume none",
      start: "top 70%",
      end: "bottom top",
    },
  });
  categoriesTimeline.fromTo(
    categories.querySelector("div"),
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0 }
  );
  categoriesTimeline.fromTo(
    Array.from(categories.querySelectorAll("button")),
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0 }
  );
  gsap.fromTo(
    Array.from(buy.querySelectorAll("section")),
    { opacity: 0, x: "80vw" },
    {
      opacity: 1,
      x: 0,
      stagger: 0.2,
      ease: "power2.inOut",
      duration: 1,
      scrollTrigger: {
        trigger: buy,
        toggleActions: "play pause resume none",
        start: "top 90%",
        end: "bottom top",
      },
    }
  );
}
function offsArticle() {
  const offs = document.querySelector(".offs");
  const offsSection = document.querySelector(".ofssarticle section");
  const imageToggle = [
    "images/Lamborghini-Revuelto-Front-Centre.jpg",
    "images/Ps-Blog-23.jpg",
    "images/e20722ac82f89475d007724640dcfb61999ddfea.jpg",
  ];
  const toggleRows = document.querySelectorAll(".toggle-row div");
  const imageChanged = offsSection.querySelector("img");
  const offTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: offs,
      toggleActions: "play pause resume none",
      start: "top 90%",
      end: "bottom top",
    },
    ease: "power2.inOut",
  });
  offTimeline.fromTo(offs, { opacity: 0, x: -100 }, { opacity: 1, x: 0 });
  offTimeline.fromTo(
    Array.from(offs.querySelectorAll("h2")),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.2 }
  );
  let count = 0;
  window.setInterval(() => {
    toggleRows.forEach((obj, index) => {
      index <= count ? (obj.style.opacity = 1) : (obj.style.opacity = 0.8);
    });
    imageChanged.src = imageToggle[count];
    gsap.fromTo(imageChanged, { opacity: 0 }, { opacity: 1, duration: 1 });
    count >= 2 ? (count = 0) : count++;
  }, 2000);
}
function customerComment() {
  const customerComment = document.querySelector(".customer-comment");
  const comments = Array.from(document.querySelectorAll(".comments"));
  gsap.fromTo(
    customerComment.querySelector("h2"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: customerComment,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
    }
  );
  gsap.fromTo(
    customerComment.querySelector("p"),
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: customerComment,
        toggleActions: "play pause resume none",
        start: "top 80%",
        end: "bottom top",
      },
    }
  );
  const commentsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: comments,
      toggleActions: "play pause resume none",
      start: "top 80%",
      end: "bottom top",
    },
  });
  commentsTimeline.fromTo(comments,{opacity:0,x:-100},{opacity:1,x:0,duration:1,stagger:0.2})
}
header();
choose();
works();
rent();
offsArticle();
customerComment();
