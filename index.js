// Smooth Entrance Observer
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.animate-on-scroll').forEach(function (el) { return observer.observe(el); });
// Authentication Persistence Logic + redirect
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    var token = localStorage.getItem('token');
    var userEmail = localStorage.getItem('userEmail');
    var userName = localStorage.getItem('userName');
    if (!token) {
        console.info('No token found: showing public homepage.');
    }
    else {
        console.info('Token found: user is authenticated.');
    }
    var guestSection = document.getElementById('auth-guest');
    var userSection = document.getElementById('auth-user');
    var nameDisplay = document.getElementById('user-display-name');
    if (token && userEmail) {
        if (guestSection)
            guestSection.classList.add('hidden');
        if (userSection)
            userSection.classList.remove('hidden');
        if (nameDisplay)
            nameDisplay.textContent = (userName || userEmail.split('@')[0]).toUpperCase();
    }
    else {
        if (guestSection)
            guestSection.classList.remove('hidden');
        if (userSection)
            userSection.classList.add('hidden');
    }
    (_a = document.getElementById('logout-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.reload();
    });
});
