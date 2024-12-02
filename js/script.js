// slideshow for the ads

let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    console.log("Slide position is", slideIndex - 1);
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000); 
}

showSlides();

