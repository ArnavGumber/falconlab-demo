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
