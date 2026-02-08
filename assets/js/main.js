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

// Dynamic Greeting
const greetings = ["Hello", "Hola", "Bonjour", "Namaste", "Konnichiwa", "Salam"];
const greetingElement = document.getElementById('greeting');
let greetingIndex = 0;

if (greetingElement) {
    setInterval(() => {
        greetingElement.style.opacity = 0;
        setTimeout(() => {
            greetingIndex = (greetingIndex + 1) % greetings.length;
            greetingElement.textContent = greetings[greetingIndex];
            greetingElement.style.opacity = 1;
        }, 500);
    }, 3000);
}
