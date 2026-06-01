const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
const slides = document.querySelectorAll('.banner-carousel .slide');
let currentSlide = 0;

navToggle?.addEventListener('click', () => {
  navbar.classList.toggle('open');
});

const rotateSlides = () => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
};

setInterval(rotateSlides, 5000);
