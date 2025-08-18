gsap.registerPlugin(ScrollTrigger);

function header() {
  const headerTimeline = gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power.inOut"
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
function choose(){
  const choose = document.querySelector(".choose")
  const chooseDiv = choose.querySelector("div")
  const chooseSec = choose.querySelector("section")
  gsap.fromTo(chooseDiv.querySelector("h2"),{y:30,opacity:0},{y:0,opacity:1,scrollTrigger:{trigger:chooseDiv,toggleActions: "play pause resume none",start:"top 90%",end:"bottom top"}})
  gsap.fromTo(chooseDiv.querySelector("p"),{y:30,opacity:0},{y:0,opacity:1,scrollTrigger:{trigger:chooseDiv,toggleActions: "play pause resume none",start:"top 90%",end:"bottom top"}})
  gsap.fromTo(Array.from(chooseSec.querySelectorAll("div")),{x:-20,y:100,opacity:0},{x:0,y:0,opacity:1,ease:"power.inOut",scrollTrigger:{trigger:chooseSec,toggleActions: "play pause resume none",start:"top 90%",end:"bottom top"},stagger:0.2})
}
function works(){
  const works = document.querySelector(".works")
  const worksDiv = works.querySelector("div")
  const worksSec = works.querySelector("section")
  const worksTimeline = gsap.timeline({defaults: {ease: "power.inOut",scrollTrigger:{trigger: works,toggleActions: "play pause resume reset",start:"top 90%",end:"bottom top"}}})
  worksTimeline.fromTo(worksDiv,{opacity:0},{opacity:1,duration:2})
  worksTimeline.fromTo(worksSec.querySelector("h2"),{x: -30,opacity:0},{x:0,opacity:1})
}
header();
choose()