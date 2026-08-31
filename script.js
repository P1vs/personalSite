// 1. Gestione stile Navbar allo scorrimento della pagina
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Logica ScrollSpy (Ottimizzata)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Attiva la sezione quando passa esattamente a metà schermo
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// 3. Popolamento dinamico della sezione Works con i progetti GitHub
const githubUsername = 'P1vs';
const track = document.getElementById('track');

async function populateCarousel() {

    try {
        // Chiamata all'API: prende i tuoi repo pubblici, ordinati per data di aggiornamento.
        // per_page=6 limita i risultati a 6 progetti, per mantenere il layout pulito come nel tuo esempio.
        const url = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`;

        const response = await fetch(url, {
            headers: {
            'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Errore nella chiamata API: ${response.status}`);
        }

        const repos = await response.json();

        console.log('Progetti GitHub recuperati:', repos);

        // Svuota i progetti "finti" scritti in HTML
        track.innerHTML = '';

        // Genera una nuova slide per ogni repository trovato
        repos.forEach(repo => {
            // Gestisce il caso in cui un repository non abbia una descrizione su GitHub
            const description = repo.description ? repo.description : 'Nessuna descrizione disponibile per questo progetto.';
            
            // Usa lo <span> vuoto che avevi nell'HTML per mostrare il linguaggio di programmazione principale
            const language = repo.language ? `<h4>${repo.language}</h4>` : '<h4>N/A</h4>';

            // Crea l'HTML della singola slide usando i template literal
            const slideHTML = `
            <div class="slide">
                <h3>${repo.name.replace(/-/g, ' ')}</h3> 
                <p>${description}</p>
                ${language}
                <span></span>
                <button class="slide-button" onclick="window.open('${repo.html_url}', '_blank')">View Project</button>
            </div>
            `;
            
            // Aggiunge la slide al contenitore
            track.innerHTML += slideHTML;
        });

    } 
    catch (error) {
        console.error('Errore durante il caricamento dei progetti:', error);
        
        // In caso di errore (es. limite API raggiunto), puoi mostrare un messaggio di fallback
        track.innerHTML = '<p style="text-align:center; padding: 20px;">Impossibile caricare i progetti in questo momento.</p>';
    }
}

// Avvia la funzione appena la pagina ha finito di caricare il DOM
document.addEventListener('DOMContentLoaded', populateCarousel);

// 4. Logica del Carosello per la sezione Works (Multi-scheda)
let currentIndex = 0;

function getSlides() {
    return document.getElementById('track') ? Array.from(document.getElementById('track').children) : [];
}

// Determina quante schede sono visibili in base alla larghezza dello schermo
function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 650) return 1;
    if (width <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    const slides = getSlides(); // Prende le slide aggiornate!
    if (!track || slides.length === 0) return;

    const visibleSlides = getVisibleSlides();
    const maxIndex = Math.max(0, slides.length - visibleSlides);

    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Aggiungi un controllo di sicurezza nel caso non ci siano slide
    const slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
    const gap = 20; 
    const moveAmount = (slideWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveAmount}px)`;
}

function moveSlide(direction) {
    const slides = getSlides(); // Prende le slide aggiornate!
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

// 5. Logica del Burger Menu Mobile
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

// 6. Gestione Invio Modulo Contatti
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita il ricaricamento della pagina
        
        // Qui un domani potrai inserire il codice per inviare davvero l'email (es. EmailJS o una tua API)
        alert('Messaggio inviato con successo!');
        contactForm.reset(); // Svuota i campi dopo l'invio
    });
}