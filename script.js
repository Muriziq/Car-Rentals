function header() {
  const headerTimeline = gsap.timeline({defaults: {
    duration: 1
  }});
  headerTimeline.fromTo(
    ".background",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1}
  );
  const menuBar = document.querySelector(".menu-bar");
  headerTimeline.to(menuBar,{opacity:1})
  headerTimeline.fromTo(menuBar.querySelector("div"), {x:-10,opacity:0}, {x:0,opacity:1},"-=0.5");
  headerTimeline.fromTo(menuBar.querySelector("button"), {x:10,opacity:0}, {x:0,opacity:1},"-=0.5");
  headerTimeline.fromTo(menuBar.querySelectorAll("a"), {y:10,opacity:0}, {y:0,opacity:1,stagger: 0.2},"-=0.5");
  const headerText = document.querySelector(".header-text").children
  headerTimeline.fromTo(headerText,{y:10,opacity:0},{y:0,opacity:1,stagger:0.2},"-=1")
  

}
header();
