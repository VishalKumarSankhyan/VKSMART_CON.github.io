var image_number = 0;
var slide_info = 0;
var interval = 0;
var autoplay = null;
var autoplaytime = 2500;
var autopstoptimer = 500;

var slider = new KeenSlider("#my-keen-slider", {
  loop: true,
  created: function (instance) {
    /*document
      .getElementById("arrow-left")
      .addEventListener("click", function () {
        instance.prev()
        clearInterval(interval);
        autoplay(true)
      })

    document
      .getElementById("arrow-right")
      .addEventListener("click", function () {
        instance.next()
        clearInterval(interval);
        autoplay(true)
      })*/

      var sliderElement = document.getElementById("my-keen-slider");

      autoplay = function(run) {
        clearInterval(interval);
        interval = setInterval(() => {
          if (run && slider) {
            instance.next()
          }
        }, autoplaytime);
      }

      autoplay(true);

      sliderElement.addEventListener("mouseover", () => {
        autoplay(false);
      });
      sliderElement.addEventListener("mouseout", () => {
        clearInterval(interval);
        autoplay(true);
      });


    var dots_wrapper = document.getElementById("dots")
    var slides = document.querySelectorAll(".keen-slider__slide")
    slides.forEach(function (t, idx) {
      //var dot = document.createElement("button")
      var dot = document.createElement("button")
      dot.classList.add("dot")
      dot.disabled = true;
      dots_wrapper.appendChild(dot)
      
      dot.addEventListener("click", function () {
        instance.moveToSlide(idx)
        clearInterval(interval);
        autoplay(true)
      })
    })
    updateClasses(instance)
  },
  slideChanged(instance) {
    updateClasses(instance)
  },
})

function updateClasses(instance) {
  var slide = instance.details().relativeSlide
  slide_info = slide;
  var arrowLeft = document.getElementById("arrow-left")
  var arrowRight = document.getElementById("arrow-right")
  // if loop is false then use it
  /*
  slide === 0
    ? arrowLeft.classList.add("arrow--disabled")
    : arrowLeft.classList.remove("arrow--disabled")
  slide === instance.details().size - 1
    ? arrowRight.classList.add("arrow--disabled")
    : arrowRight.classList.remove("arrow--disabled")
  */

  var keenslider = document.querySelectorAll(".keen-slider__slide");

  image_number = keenslider.length;

  //dots.forEach(function (dot, idx) {
}

