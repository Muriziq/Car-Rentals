gsap.registerPlugin(ScrollTrigger);

export function gsapAnimation() {
  const ftl = gsap.timeline();
  
  ftl.fromTo(".background-image", 
    { opacity: 0 }, 
    { opacity: 1, duration: 2, ease: "power2.inOut" }
  );
  ftl.fromTo(".header-text h1", 
    { x: -200, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1 }, 
    "-=1"
  );
  ftl.fromTo(".header-text p", 
    { y: 10, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5 }, 
    "-=0.3"
  );
  ftl.fromTo(".search-place", 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.5 }
  );
  ftl.fromTo(".pickup", 
    { y: 15, opacity: 0 }, 
    { y: 0, opacity: 1, stagger: 0.2 }
  );
  ftl.fromTo(".choose > div", 
    { opacity: 0 }, 
    { opacity: 1, duration: 1 }, 
    "-=0.3"
  );
  
  const headerHeight = document.querySelector("header").offsetHeight;

  const ftl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".background",
      start: `top+=${headerHeight} top`,
      end: "bottom top",
      scrub: true,
    },
  });

  ftl2.fromTo(
    ".background-image",
    { y: 0, opacity: 1 },
    { y: -100, opacity: 0 },
  );
  ftl2.fromTo(".header-text", { y: 0 }, { y: -200 }, "<");
  ftl2.fromTo(".search-place", { y: 0 }, { y: -200 }, "<");

  gsap.utils.toArray(".choose > section > div").forEach((div) => {
    gsap.fromTo(div, 
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: div,
          start: "top 90%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  });

  gsap.fromTo(".works > section p", 
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".works > section",
        start: "top bottom",
        end: "bottom 110%",
        scrub: true,
      },
      stagger: 0.2,
    }
  );

  const wrks = gsap.timeline({
    scrollTrigger: {
      trigger: ".works",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  wrks.fromTo(".works", { y: 0, opacity: 1 }, { y: -100, opacity: 0 });
  wrks.fromTo(
    ".works > div",
    { y: 0, opacity: 1 },
    { y: -200, opacity: 0 },
    "<",
  );
  wrks.fromTo(".works > section", { y: 0 }, { y: -230 }, "<");

  gsap.fromTo(".offs > div", 
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".offs",
        start: "top bottom",
        end: "bottom 80%",
        scrub: true,
      },
      stagger: 0.5,
    }
  );

  gsap.utils
    .toArray(".forms > section > div:last-of-type > div")
    .forEach((div) => {
      gsap.fromTo(div, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: div, start: "top 90%" },
        }
      );
    });

  const formt = gsap.timeline({
    scrollTrigger: {
      trigger: ".forms",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  
  formt.fromTo(".forms", { y: 0, opacity: 1 }, { y: -150, opacity: 0 });


}

