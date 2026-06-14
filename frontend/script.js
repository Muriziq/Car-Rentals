import {gsapAnimation} from "./src/gsap/indexGsap.js";
import menuBar from "./src/menubar.js";
gsapAnimation();
menuBar()
window.addEventListener("resize",()=>{
  gsapAnimation()

})
const loginPage = document.querySelector(".login-page")
const login =   document.querySelector(".login")
const signUp = document.querySelector(".signup")
const rentalCar = document.querySelector(".rental-car")


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



document.querySelector(".categories > button").addEventListener("click",()=>{
    rentalCar.style.display = "grid"

})
document.querySelector("header > button").addEventListener("click",()=>{
loginPage.style.display = "grid"
  login.style.display = "flex"
  signUp.style.display = "none"
})
document.querySelectorAll(".cancel").forEach(cancel => {
cancel.addEventListener("click",()=>{
  loginPage.style.display = "none"
  rentalCar.style.display = "none"
})
})
document.querySelector(".switch-signup").addEventListener("click",()=>{
 login.style.display = "none"
  signUp.style.display = "flex"
})
document.querySelector(".switch-login").addEventListener("click",()=>{
 login.style.display = "flex"
  signUp.style.display = "none"
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
 rentalCar.style.display = "grid"
 document.querySelector(".rental1 input").focus()
  });

  // --- Multi-Step Form Logic ---
document.querySelectorAll('.next-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Find the current step and the target step
    const currentStep = button.closest('.form-step');
    const nextStepId = button.getAttribute('data-next');
    const nextStep = document.getElementById(nextStepId);

    // Hide current, show next
    currentStep.style.display = 'none';
    nextStep.style.display = 'flex';
  });
});

document.querySelectorAll('.back-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Find the current step and the target step
    const currentStep = button.closest('.form-step');
    const prevStepId = button.getAttribute('data-back');
    const prevStep = document.getElementById(prevStepId);

    // Hide current, show previous
    currentStep.style.display = 'none';
    prevStep.style.display = 'flex';
  });
});