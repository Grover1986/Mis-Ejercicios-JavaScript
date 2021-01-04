document.addEventListener('DOMContentLoaded', () => {
     // CHANGE ONLY THIS
     const SLIDETIME = 500; //ms
     // --------------------------
   
     const backButton = document.querySelector('.slider-back-btn');
     const forwardButton = document.querySelector('.slider-next-btn');
     // Select all slides and convert node to array for easy handling
     // const allSlides = Array.from(document.querySelectorAll('.slide'));
     const allSlides = [...document.querySelectorAll('.slide')];
     let clickable = true;
     let active = null;
     let newActive = null;
   
     function initSlider() {
         
       allSlides.forEach(slide =>
         slide.setAttribute(
           'style',
           `transition: transform ${SLIDETIME}ms ease;
                        animation-duration: ${SLIDETIME}ms`,
         ),
       );
     }
   
     function changeSlide(forward) {
       if (clickable) {
         clickable = false;
         active = document.querySelector('.active');
         const activeSlideIndex = allSlides.indexOf(active);
   
         if (forward) {
           console.log('activeSlideIndex: ', activeSlideIndex);
           console.log('allSlides.length: ', allSlides.length);
           console.log('new slide: ', (activeSlideIndex + 1) % allSlides.length);
   
           newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
           active.classList.add('slideOutLeft');
           newActive.classList.add('slideInRight', 'active');
         } else {
           console.log('activeSlideIndex: ', activeSlideIndex);
           console.log('allSlides.length: ', allSlides.length);
           console.log('new slide: ', (activeSlideIndex - 1 + allSlides.length) % allSlides.length);
   
           newActive =
             allSlides[
               (activeSlideIndex - 1 + allSlides.length) % allSlides.length
             ];
           active.classList.add('slideOutRight');
           newActive.classList.add('slideInLeft', 'active');
         }
       }
     }
     
     allSlides.forEach(slide => {
       slide.addEventListener('transitionend', e => {
         // Check for the old active transition and if clickable is false
         // to not trigger it more than once
         if (slide === active && !clickable) {
           clickable = true;
           // Remove all CSS animation classes on old active
           active.className = 'slide';
         }
       });
     });
     
     //Event listeners
     forwardButton.addEventListener('click', () => {
       changeSlide(true);
     });
     backButton.addEventListener('click', () => {
       changeSlide(false);
     });
   
     // Init the slider
     initSlider();
   });
     