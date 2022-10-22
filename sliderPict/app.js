document.addEventListener('DOMContentLoaded', function () {
  const upBtn = document.querySelector('.up-button');
  const downBtn = document.querySelector('.down-button');
  const sidbar = document.querySelector('.sidebar');
  const mainSlide = document.querySelector('.main-slide');
  const slides = mainSlide.querySelectorAll('div');
  const container = document.querySelector('.container');
  const heightDisp = container.clientHeight;

  let activeSlideIndex = 0;

  sidbar.style.top = `-${(slides.length - 1) * 100}vh`

  upBtn.addEventListener('click', () => {
    changeSlide('up');
  });

  downBtn.addEventListener('click', () => {
    changeSlide('down');
  });

  function changeSlide(params) {
    if (params === 'up') {
      activeSlideIndex++;
      if (activeSlideIndex === slides.length) {
        activeSlideIndex = 0;
      }
    }
    if (params === 'down') {
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = slides.length - 1;
      }
    }
    mainSlide.style.transform = `translateY(-${activeSlideIndex * heightDisp}px)`;
    sidbar.style.transform = `translateY(${activeSlideIndex * heightDisp}px)`;
  }



});