// 1. Gestione stile Navbar allo scorrimento della pagina
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Logica ScrollSpy (Evidenziazione della sezione attiva nella Navbar)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const hrefAttr = link.getAttribute('href');
        if (hrefAttr && hrefAttr.startsWith('#') && hrefAttr.substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 3. Logica del Carosello per la sezione Works (Multi-scheda)
const track = document.getElementById('track');
const slides = track ? Array.from(track.children) : [];
let currentIndex = 0;

// Determina quante schede sono visibili in base alla larghezza dello schermo
function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 650) return 1;
    if (width <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    if (!track || slides.length === 0) return;

    const visibleSlides = getVisibleSlides();
    const maxIndex = Math.max(0, slides.length - visibleSlides);

    // Impedisce di scorrere in spazi vuoti oltre l'ultima scheda
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20; // Deve corrispondere al gap definito nel CSS (.carousel-track)
    const moveAmount = (slideWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveAmount}px)`;
}

function moveSlide(direction) {
    if (slides.length === 0) return;

    const visibleSlides = getVisibleSlides();
    const maxIndex = Math.max(0, slides.length - visibleSlides);

    currentIndex += direction;

    if (currentIndex > maxIndex) {
        currentIndex = 0; // Torna all'inizio
    } else if (currentIndex < 0) {
        currentIndex = maxIndex; // Va all'ultimo gruppo di progetti
    }

    updateCarousel();
}

// Inizializza e aggiorna al resize della finestra
window.addEventListener('resize', updateCarousel);

// 4. Logica del Burger Menu Mobile
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');
const navLinksItemsDesktop = document.querySelectorAll('.nav-links a');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    navLinksItemsDesktop.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
}