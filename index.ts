// Smooth Entrance Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

// Authentication Persistence Logic + redirect
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (!token) {
        console.info('No token found: showing public homepage.');
    } else {
        console.info('Token found: user is authenticated.');
    }

    const guestSection = document.getElementById('auth-guest');
    const userSection = document.getElementById('auth-user');
    const nameDisplay = document.getElementById('user-display-name');

    if (token && userEmail) {
        if (guestSection) guestSection.classList.add('hidden');
        if (userSection) userSection.classList.remove('hidden');
        if (nameDisplay) nameDisplay.textContent = (userName || userEmail.split('@')[0]).toUpperCase();
    } else {
        if (guestSection) guestSection.classList.remove('hidden');
        if (userSection) userSection.classList.add('hidden');
    }

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.reload();
    });
});
