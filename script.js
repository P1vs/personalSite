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
        // Se abbiamo scrollato fino a un terzo della sezione, la consideriamo attiva
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 3. Logica del Carosello per la sezione Works
const track = document.getElementById('track');
const slides = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
    // Calcola la larghezza dinamica della slide in base allo schermo
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
}

function moveSlide(direction) {
    currentIndex += direction;

    // Gestione del ciclo infinito del carosello
    if (currentIndex >= slides.length - 2) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 3;
    }

    updateCarousel();
}

// 4. Logica del Burger Menu Mobile
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');
const navLinksItemsDesktop = document.querySelectorAll('.nav-links a'); // Riuso quelli esistenti

// Apri e chiudi il menu al click del burger
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Chiudi il menu automaticamente quando l'utente seleziona un link
navLinksItemsDesktop.forEach(link => {
    link.addEventListener('click', () => {
        // Rimuove le classi attive solo se il menu è aperto (modalità mobile)
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Ricalcola le dimensioni se la finestra viene ridimensionata
window.addEventListener('resize', updateCarousel);