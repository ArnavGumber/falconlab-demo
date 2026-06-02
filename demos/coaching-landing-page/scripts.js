const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let activeIndex = 0;
let slideInterval;

const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
};

const nextSlide = () => {
  activeIndex = (activeIndex + 1) % slides.length;
  showSlide(activeIndex);
};

const navToggle = document.querySelector('.mobile-nav-toggle');
const siteHeader = document.querySelector('.site-header');
const nav = document.querySelector('.nav');

if (navToggle && siteHeader && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteHeader.classList.toggle('nav-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (siteHeader.classList.contains('nav-open')) {
        siteHeader.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const prevSlide = () => {
  activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  showSlide(activeIndex);
};

const startCarousel = () => {
  slideInterval = setInterval(nextSlide, 6500);
};

const resetCarousel = () => {
  clearInterval(slideInterval);
  startCarousel();
};

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetCarousel();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetCarousel();
});

showSlide(activeIndex);
startCarousel();
