// ─── Scroll Animation Observer ───────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

// ─── Authentication Logic ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const token     = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userName  = localStorage.getItem('userName');

    const guestSection = document.getElementById('auth-guest') as HTMLElement | null;
    const userSection  = document.getElementById('auth-user')  as HTMLElement | null;
    const nameDisplay  = document.getElementById('user-display-name') as HTMLElement | null;

    if (token && userEmail) {
        // ── Logged in: show user section, hide guest section
        if (guestSection) guestSection.classList.add('hidden');
        if (userSection)  userSection.classList.remove('hidden');
        if (nameDisplay) nameDisplay.textContent = (userEmail ?? '').split('@')[0].toUpperCase();
        console.info('Authenticated user:', userEmail);
    } else {
        // ── Not logged in: show guest section (default), keep user section hidden
        if (guestSection) guestSection.classList.remove('hidden');
        if (userSection)  userSection.classList.add('hidden');
        console.info('No token found — showing public homepage.');
    }

    // ─── Logout ──────────────────────────────────────────────────────────────
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.reload();
    });
});
