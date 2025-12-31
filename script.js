gsap.registerPlugin(ScrollTrigger);


const ftl = gsap.timeline()
ftl.from(".background-image",{opacity:0,duration:2,ease:"power2.inOut"})
ftl.from(".header-text h1",{x:-200,opacity:0,duration:1},"-=1")
ftl.from(".header-text p",{y:10,opacity:0,duration:0.5},"-=0.3")
ftl.from(".search-place",{opacity:0,duration:0.5})
ftl.from(".pickup",{y:15,opacity:0,stagger:0.2})
ftl.from(".choose > div",{opacity:0,duration:1},"-=0.3")
const headerHeight = document.querySelector("header").offsetHeight;

const ftl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".background",
    start: `top+=${headerHeight} top`,
    end: "bottom top",
    scrub: true
  }
});

ftl2.fromTo(
  ".background-image",
  { y: 0,opacity:1 },
  { y: -100,opacity:0 }
);
ftl2.fromTo(".header-text",{y:0},{y:-200},"<")
ftl2.fromTo(".search-place",{y:0},{y:-200},"<")

gsap.utils.toArray(".choose > section > div").forEach(div=>{
  gsap.from(div,{y:150,opacity:0,duration:0.5,scrollTrigger:{trigger:div,start:"top 90%",end:"bottom 60%",scrub:true}})
})

gsap.from(".works > section p",{y:100,opacity:0,scrollTrigger:{trigger:".works > section",start:"top bottom",end:"bottom 110%",scrub:true},stagger:0.2})
const wrks = gsap.timeline({scrollTrigger:{
  trigger: ".works",
  start:"top top",
  end: "bottom top",
  scrub:true
}})

wrks.fromTo(".works",{y:0,opacity:1},{y:-100,opacity:0})
wrks.fromTo(".works > div",{y:0,opacity:1},{y:-200,opacity:0},"<")
wrks.fromTo(".works > section",{y:0},{y:-230},"<")

gsap.from(".offs > div",{y:100,opacity:0,scrollTrigger:{trigger:".offs",start:"top bottom",end:"bottom 80%",scrub:true},stagger:0.5})

gsap.utils.toArray(".forms > section > div:last-of-type > div").forEach(div=>{
    gsap.from(div,{y:100,opacity:0,duration:0.5,scrollTrigger:{trigger:div,start:"top 90%"}})

})
const formt = gsap.timeline({scrollTrigger:{trigger:".forms",  start:"top top",
  end: "bottom top",
  scrub:true}})
formt.fromTo(".forms",{y:0,opacity:1},{y:-150,opacity:0})

const toggleImages = [
  "e20722ac82f89475d007724640dcfb61999ddfea.jpg",
  "Lamborghini-Revuelto-Front-Centre.jpg",
  "Ps-Blog-23.jpg"
];

const toggleImage = document.querySelector(".ofssarticle > section img");

let toggleStart = 0;
toggleImage.src = `images/${toggleImages[toggleStart]}`;
setInterval(() => {
  toggleStart = (toggleStart + 1) % toggleImages.length;
  toggleImage.src = `images/${toggleImages[toggleStart]}`;
document.querySelectorAll(".toggle-row  div").forEach((toggle,index)=>{
  if(index === toggleStart){
    toggle.style.opacity = 0.5
  }else{
    toggle.style.opacity = 1
  }
  console.log(toggle)
})
}, 2000);



document.querySelectorAll('header a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

const mobileMenu = document.querySelector("header nav");

document.querySelector(".menu-btn").addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    const links = mobileMenu.querySelectorAll("a")
    if(mobileMenu.classList.contains("active")){
        gsap.fromTo(links,{opacity:0,y:20},{opacity:1,y:0,stagger:0.1})
    }else{
        gsap.fromTo(links,{opacity:1,y:0},{opacity:0,y:20,stagger:0.1})
    }
});

document.querySelector(".categories > button").addEventListener("click",()=>{
    document.querySelector(".rental-car").style.display = "grid"

})
document.querySelector("header > button").addEventListener("click",()=>{
document.querySelector(".login-page").style.display = "grid"
  document.querySelector(".login").style.display = "flex"
  document.querySelector(".signup").style.display = "none"
})
document.querySelectorAll(".cancel").forEach(cancel => {
cancel.addEventListener("click",()=>{
  document.querySelector(".login-page").style.display = "none"
  document.querySelector(".rental-car").style.display = "none"
})
})
document.querySelector(".forget button").addEventListener("click",()=>{
  document.querySelector(".login").style.display = "none"
  document.querySelector(".signup").style.display = "flex"
})
document.querySelector(".signup > p").addEventListener("click",()=>{
  document.querySelector(".login").style.display = "flex"
  document.querySelector(".signup").style.display = "none"
})
document.querySelectorAll(".see").forEach((see,i)=>{
  see.addEventListener("click",()=>{
    const seeInput = document.querySelectorAll(".seePass")[i]
    if(seeInput.type === "password"){
      seeInput.type = "text"
      see.src = "images/Vector.svg"
    }else{
            seeInput.type = "password"
      see.src = "images/Group 1171275009.svg"
    }
  })
})


  document.querySelector(".search-place > button").addEventListener("click", () => {
 document.querySelector(".rental-car").style.display = "grid"
 document.querySelector(".rental1 input").focus()
  });