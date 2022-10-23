// Carousel tutorial https://www.youtube.com/watch?v=gBzsE0oieio

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
function setSlidePosition(slide, i) {
    slide.style.left = slideWidth * i + 'px';
}
slides.forEach(setSlidePosition);

// Creating the motion between two slides
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
// Changing the actice indicator while changing slide
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

// Hiding the arrow at the start and end of the carousel to stop any clicking
const arrowDisplay = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//Stopping the video while changing slide from https://codepen.io/michaelsmyth94/pen/EVQEQV?editors=0010
(function($) {
    jQuery(document).ready(function($) {
      
      /*
       * The below example uses Slick Carousel, however this can be
       * extended into any type of carousel, provided it lets you
       * bind events when the slide changes. This will only work
       * if all framed videos have the JS API parameters enabled.
       */
      
      //bind our event here, it gets the current slide and pauses the video before each slide changes.
      $(".slick").on("beforeChange", function(event, slick) {
        var currentSlide, slideType, player, command;
        
        //find the current slide element and decide which player API we need to use.
        currentSlide = $(slick.$slider).find(".slick-current");
        
        //determine which type of slide this, via a class on the slide container. This reads the second class, you could change this to get a data attribute or something similar if you don't want to use classes.
        slideType = currentSlide.attr("class").split(" ")[1];
        
        //get the iframe inside this slide.
        player = currentSlide.find("iframe").get(0);
        
        if (slideType == "vimeo") {
          command = {
            "method": "pause",
            "value": "true"
          };
        } else {
          command = {
            "event": "command",
            "func": "pauseVideo"
          };
        }
        
        //check if the player exists.
        if (player != undefined) {
          //post our command to the iframe.
          player.contentWindow.postMessage(JSON.stringify(command), "*");
        }
      });
      
      //start the slider
      $(".slick").slick({
        infinite: false,
        arrows: false,
        dots: true
      });
      
      //run the fitVids jQuery plugin to ensure the iframes stay within the item.
      $('.item').fitVids();
      
    });
  })(jQuery);

// When I click left, move slides and dot to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    arrowDisplay(slides, prevButton, nextButton, prevIndex)
});

// When I click right, move slides and dot to the right 
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    arrowDisplay(slides, prevButton, nextButton, nextIndex)
});

// When I click on the nav indicator move to that slide
dotsNav.addEventListener('click', e => {
    // What indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    arrowDisplay(slides, prevButton, nextButton, targetIndex);
})
