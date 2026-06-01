const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateCarousel(index) {
  carouselItems.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
}

function showNext() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel(currentIndex);
}

prevBtn?.addEventListener('click', showPrev);
nextBtn?.addEventListener('click', showNext);

let carouselInterval = setInterval(showNext, 4000);

const carouselSection = document.querySelector('.carousel-section');
carouselSection?.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carouselSection?.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(showNext, 4000);
});

// Multi-image rotator for feature cards
(() => {
  const multiImgs = document.querySelectorAll('img.multi-img[data-images]');
  const rotators = new Map();
  const INTERVAL = 4000;

  function startRotator(img) {
    const state = rotators.get(img);
    if (!state) return;
    if (state.timer) clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.idx = (state.idx + 1) % state.imgs.length;
      // Fade out effect
      img.classList.add('fade-out');
      setTimeout(() => {
        img.src = state.imgs[state.idx];
        // Fade in effect
        img.classList.remove('fade-out');
      }, 300);
    }, INTERVAL);
    rotators.set(img, state);
  }

  function stopRotator(img) {
    const state = rotators.get(img);
    if (!state) return;
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
      rotators.set(img, state);
    }
  }

  multiImgs.forEach(img => {
    const raw = img.getAttribute('data-images');
    if (!raw) return;
    let imgs;
    try { imgs = JSON.parse(raw); } catch (e) { return; }
    if (!Array.isArray(imgs) || imgs.length === 0) return;

    // initial state
    const state = { imgs, idx: 0, timer: null };
    rotators.set(img, state);

    // ensure src is first image
    img.src = imgs[0];

    // start
    startRotator(img);

    // pause on hover
    img.addEventListener('mouseenter', () => stopRotator(img));
    img.addEventListener('mouseleave', () => startRotator(img));
  });
})();
