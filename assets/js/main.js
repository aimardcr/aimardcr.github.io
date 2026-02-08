// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

// Check local storage or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
setTheme(savedTheme || systemTheme);

// Toggle Event
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible to run animation only once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Typing Animation
const greetings = ["Hello", "Hola", "Bonjour", "Namaste", "Konnichiwa", "Salam"];
const greetingElement = document.getElementById('greeting');
let greetingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!greetingElement) return;

    const currentGreeting = greetings[greetingIndex];

    if (isDeleting) {
        greetingElement.textContent = currentGreeting.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        greetingElement.textContent = currentGreeting.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Slower when typing
    }

    if (!isDeleting && charIndex === currentGreeting.length) {
        // Finished typing word
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting word
        isDeleting = false;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', type);
