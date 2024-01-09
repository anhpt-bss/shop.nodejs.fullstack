let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("product_gallery__slides");
  let dots = document.getElementsByClassName("product_gallery__thumb__img");
  let captionText = document.getElementById(
    "product_gallery__caption__content"
  );
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;

  // Initiate zoom effect:
  imageZoom(`image_${n}`, `zoom_result_${n}`);
}

function imageZoom(imgID, resultID) {
  let img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "product_gallery__zoom_lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  img.addEventListener("mouseleave", () => {
    result.style.opacity = 0;
    result.style.zIndex = -1;
    lens.style.opacity = 0;
    lens.style.zIndex = -1;
  });
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    let pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    // if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
    // if (x < 0) { x = 0; }
    // if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
    // if (y < 0) { y = 0; }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*set the position of the zoom result:*/
    result.style.left = x + 100 + "px";
    result.style.top = y + 100 + "px";

    if (
      x < 0 ||
      x > img.width - lens.offsetWidth ||
      y < 0 ||
      y > img.height - lens.offsetHeight
    ) {
      result.style.opacity = 0;
      result.style.zIndex = -1;
      lens.style.opacity = 0;
      lens.style.zIndex = -1;
    } else {
      result.style.opacity = 1;
      result.style.zIndex = 2;
      lens.style.opacity = 1;
      lens.style.zIndex = 2;
    }
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
