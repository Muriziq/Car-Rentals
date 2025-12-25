gsap.registerPlugin(ScrollTrigger);


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