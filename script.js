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

const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const signUpBtn = document.getElementById('signUpBtn');
const logInBtn = document.getElementById('logInBtn');

// shows the modal when website is clicked
window.addEventListener('load', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

signUpBtn.addEventListener('click', () => {
  window.location.href="signup.html";
});

logInBtn.addEventListener('click', () => {
  window.location.href="login.html";
});
