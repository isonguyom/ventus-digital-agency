//Global Declarations
let menu = document.querySelector('.vedia-menubar-container');
let harmburger = document.querySelector('.vedia-toggler');
let logo = document.querySelector('.vedia-logo');
let testiSlideIndex = 0;


// animate content on first appearance on view port
(function () {
  let elements;
  let windowHeight;

  function init() {
    elements = document.querySelectorAll('.hide');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add('fade-in-element');
        element.classList.remove('hide');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();




// toggling of menubar, hamburger
let displayMenu = function () {
  let toggler2 = document.getElementById('toggler2');
  let fixedLogo = document.querySelector('.fixed-logo')
  harmburger.classList.toggle('is-active');
  menu.classList.toggle('menu-active');
  toggler2.classList.toggle('toggler_disappear')
  fixedLogo.classList.toggle('hide-logo')
};



//testimonial slider
let testimonial = function () {
  let i;
  let client = document.getElementsByClassName("client");
  for (i = 0; i < client.length; i++) {
    client[i].style.display = "none";
  }
  testiSlideIndex++;
  if (testiSlideIndex > client.length) {
    testiSlideIndex = 1
  }
  client[testiSlideIndex - 1].style.display = "block";
  setTimeout(testimonial, 8000); // Change image every 2 seconds
}
testimonial();



// Detect request animation frame
var scroll = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame
  // IE Fallback, you can even fallback to onscroll
  ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  };
var lastPosition = -1;

// my Variables
var lastSection = false;
var replaceItemTop = -1;
var replaceItemBottom = -1;
var replaceItemHeight = -1;

// The Scroll Function
function loop() {
  var top = window.pageYOffset;
  // my variables

  // my sections to calculate stuff
  var sections = document.querySelectorAll('section');
  var replaceContainer = document.querySelectorAll('.fixed-nav');
  var replaceItem = document.querySelectorAll('.js-replace-logo');

  if (replaceItem.length > 0) {
    // get top position of item from container, because image might not have loaded
    replaceItemTop = parseInt(replaceContainer[0].getBoundingClientRect().top);
    replaceItemHeight = replaceItem[0].offsetHeight;
    replaceItemBottom = replaceItemTop + replaceItemHeight;
  }

  var sectionTop = -1;
  var sectionBottom = -1;
  var currentSection = -1;

  // Fire when needed
  if (lastPosition == window.pageYOffset) {
    scroll(loop);
    return false;
  } else {
    lastPosition = window.pageYOffset;

    // Your Function
    Array.prototype.forEach.call(sections, function (el, i) {
      sectionTop = parseInt(el.getBoundingClientRect().top);
      sectionBottom = parseInt(el.getBoundingClientRect().bottom);

      // active section
      if ((sectionTop <= replaceItemBottom) && (sectionBottom > replaceItemTop)) {
        // check if current section has bg
        currentSection = el.classList.contains('bg-primary');

        // switch class depending on background image
        if (currentSection) {
          replaceContainer[0].classList.remove('fixed-nav_reverse');
        } else {
          replaceContainer[0].classList.add('fixed-nav_reverse')
        }
      }
      // end active section

      // if active Section hits replace area
      if ((replaceItemTop < sectionTop) && (sectionTop <= replaceItemBottom)) {
        // animate only, if section background changed
        if (currentSection != lastSection) {
          document.documentElement.style.setProperty('50%', 100 / replaceItemHeight * parseInt(sectionTop - replaceItemTop) + '%');
        }
      }
      // end active section in replace area

      // if section above replace area
      if (replaceItemTop >= sectionTop) {
        // set offset to 0 if you scroll too fast
        document.documentElement.style.setProperty('--replace-offset', 0 + '%');
        // set last section to current section
        lastSection = currentSection;
      }

    });

  }

  // Recall the loop
  scroll(loop)
}

// Call the loop for the first time
loop();

window.onresize = function (event) {
  loop();
};