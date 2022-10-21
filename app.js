const slides = document.querySelectorAll('.slide');

let removeClass = () => {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  })
}

slides.forEach((slide) => {
  slide.addEventListener('click', () => {
    removeClass();
    slide.classList.add('active');
  })
})