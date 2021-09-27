// navigation links

const navigation = document.querySelector("nav");
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
const desktopLinks = document.querySelectorAll(".desktop-nav a");
const desktopAndMobileNav = document.querySelectorAll("nav, .mobile-nav");
const navigationLinks = document.querySelectorAll(".navigation-link");

// navigation links

// sections and elements

const contactSection = document.querySelector(".contact");
const landingSection = document.querySelector(".landing");
const gallerySection = document.querySelector(".gallery");
const biographySection = document.querySelector(".about-biography");
const merchSection = document.querySelector(".merch");
const bandCards = document.querySelectorAll(".band-card");
const bandMembersSection = document.querySelector(".band-members");
const facebookImage = document.querySelector(".facebook-image");
const facebookSection = document.querySelector(".facebook-group");
const modalFullScreen = document.querySelector(".modal-event-fullscreen");
const video = document.querySelector(".video-container iframe");

// sections and elements

// parallax effect

const landingWrapperOverlay = document.querySelector(
  ".landing-wrapper__overlay"
);
const landingWrapperImage = document.querySelector(".landing-wrapper__img");

const landingWrapper = document.querySelector(".landing-wrapper");

window.addEventListener(
  "scroll",
  () => {
    const distance = window.pageYOffset * 0.25;

    const landingOverlayStyles = {
      transform: `translate3d(-${distance}px, -${distance * 3}px, 0px)`,
    };

    const landingWrapperImageStyles = {
      transform: `translate3d(${distance}px, -${distance * 3}px, 0px)`,
    };

    const landingWrapperStyles = {
      transform: `translate3d(0px, ${distance * 5}px, 0px)`,
    };

    Object.assign(landingWrapper.style, landingWrapperStyles);
    Object.assign(landingWrapperOverlay.style, landingOverlayStyles);
    Object.assign(landingWrapperImage.style, landingWrapperImageStyles);

    distance > 500 && window.innerWidth > 768
      ? navigation.classList.add("fixed")
      : navigation.classList.remove("fixed");
  },
  { passive: "true" }
);

// parallax effect

// swiper

const swiper = new Swiper(".gallery", {
  spaceBetween: 20,
  effect: "coverflow",
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  centeredSlides: true,
  preloadImages: false,
  lazy: true,
  coverflowEffect: {
    rotate: 50,
    slideShadows: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    786: {
      slidesPerView: 1,
    },

    1000: {
      slidesPerView: 2,
    },

    1200: {
      slidesPerView: 2,
    },
  },
});

const bandSwiper = new Swiper(".band-members", {
  spaceBetween: 40,
  grabCursor: true,
  preloadImages: false,
  lazy: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    420: {
      slidesPerView: 1,
    },

    520: {
      slidesPerView: 2,
    },

    786: {
      slidesPerView: 2,
    },

    1000: {
      slidesPerView: 3,
    },

    1400: {
      slidesPerView: 5,
    },
  },
});

const merchSwiper = new Swiper(".merch", {
  spaceBetween: 20,
  grabCursor: true,
  preloadImages: false,
  lazy: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    420: {
      slidesPerView: 1,
    },

    520: {
      slidesPerView: 2,
    },

    1000: {
      slidesPerView: 3,
    },
  },
});

// swiper

// navigation functions

const handleNavigationToggle = () => {
  mobileNav.classList.toggle("nav-active");
  burger.classList.toggle("open");
  document.body.classList.toggle("overflow-hidden");

  if (mobileNav.classList.contains("nav-active")) {
    mobileNavLinks.forEach((link) => link.classList.add("fade-in"));
  } else {
    mobileNavLinks.forEach((link) => link.classList.remove("fade-in"));
  }
};

navigationLinks.forEach((link) => {
  const index = Number(link.getAttribute("data-nav"));

  link.addEventListener("click", () => {
    sectionsObserverGroup[index].scrollIntoView({
      inline: "start",
      block: "center",
    });
  });
});

mobileNavLinks.forEach((item) =>
  item.addEventListener("click", handleNavigationToggle)
);

burger.addEventListener("click", handleNavigationToggle);

// navigation functions

// intersection observer

const textObserverGroup = document.querySelectorAll(
  ".contact-phone a, .contact-email a"
);

const opacityObserverGroup = document.querySelectorAll(
  ".album-content-image, .facebook-group, .contact header"
);

const sectionsObserverGroup = document.querySelectorAll(
  ".landing, .about-biography, .gallery-section, .merch-section, .contact"
);

const textObserverEffect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("observed-text");
      textObserver.unobserve(entry.target);
    } else {
      entry.target.classList.remove("observed-text");
    }
  });
};

const opacityObserverEffect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-zoom");
      opacityObserver.unobserve(entry.target);
    } else {
      entry.target.classList.remove("fade-in-zoom");
    }
  });
};

const whatIsInViewEffect = (entries) => {
  entries.forEach((entry) => {
    const index = Number(entry.target.getAttribute("data-index"));
    if (entry.isIntersecting) {
      desktopLinks[index].classList.add("underline");
    } else {
      desktopLinks[index].classList.remove("underline");
    }
  });
};

const textObserver = new IntersectionObserver(textObserverEffect, {
  threshold: 0,
});
const opacityObserver = new IntersectionObserver(opacityObserverEffect, {
  threshold: 0.8,
});
const inViewObserver = new IntersectionObserver(whatIsInViewEffect, {
  threshold: 0.7,
});

sectionsObserverGroup.forEach((section) => {
  inViewObserver.observe(section);
});

textObserverGroup.forEach((element) => {
  textObserver.observe(element);
});

opacityObserverGroup.forEach((element) => {
  opacityObserver.observe(element);
});

// intersection observer

facebookImage.addEventListener("mousemove", (e) => {
  const objectX = e.offsetX - facebookImage.width / 2;
  const objectY = e.offsetY - facebookImage.height / 2;
  const facebookImageStyles = {
    transform: `rotateX(${(objectY / 120) * -1}deg) rotateY(${
      objectX / 120
    }deg)`,
  };
  Object.assign(facebookImage.style, facebookImageStyles);
});

facebookImage.addEventListener("mouseleave", () => {
  facebookImage.style.removeProperty("transform");
});

[facebookImage, modalFullScreen].forEach((item) =>
  item.addEventListener("click", () => {
    modalFullScreen.classList.toggle("modal-active");
    document.body.classList.toggle("overflow-hidden");
    desktopAndMobileNav.forEach((item) =>
      item.classList.toggle("display-none")
    );

    if (modalFullScreen.classList.contains("modal-active")) {
      const source = video.getAttribute("data-src");
      video.setAttribute("src", source);
    } else {
      video.removeAttribute("src");
    }
  })
);
