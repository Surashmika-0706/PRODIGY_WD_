// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Section Fade-in Animation
const sections = document.querySelectorAll('.section');

const revealSections = () => {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections); // Trigger on page load
