// Wait for the DOM to load before initializing Swiper
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the Swiper instance for the image slider
  var ArakuSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 3,
    spaceBetween: 5,
    coverflowEffect: {
      rotate: 10,
      stretch: -30,
      depth: 120,
      modifier: 2,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  });

  // Auto-slide functionality with a set interval
  function startAutoSlide() {
    return setInterval(() => {
      ArakuSlider.slideNext();
    }, 2000);
  }

  var autoSlideInterval = startAutoSlide(); // Initialize the auto-slide interval

  // Reset auto-slide interval on user interaction
  const prevButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');

  prevButton.addEventListener('click', () => {
    ArakuSlider.slidePrev();
    resetAutoSlide();
  });

  nextButton.addEventListener('click', () => {
    ArakuSlider.slideNext();
    resetAutoSlide();
  });

  // Reset the auto-slide interval
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = startAutoSlide(); // Reinitialize the interval
  }

  // Thumbnail Navigation
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      thumbnails.forEach((thumb) => thumb.classList.remove('active'));
      thumbnail.classList.add('active');
      ArakuSlider.slideTo(index); // Switching to slide without loop
    });
  });

  // Dynamic Caption Update
  const captionContainer = document.querySelector('.caption-container');
  ArakuSlider.on('slideChange', () => {
    const activeSlide = ArakuSlider.slides[ArakuSlider.activeIndex];
    const caption = activeSlide.getAttribute('data-caption') || "No caption available"; // Default caption

    if (captionContainer) {
      captionContainer.textContent = caption; // Update the caption text
    }

    // Sync Thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === ArakuSlider.realIndex); // Highlight active thumbnail
    });
  });
});
