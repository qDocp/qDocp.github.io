document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileMenuOpen = document.getElementById('mobileMenuOpen');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const sideNav = document.getElementById('sideNav');

    // --- Gestion du Mode Sombre ---
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
    }

    // --- Gestion du Menu Mobile (Latéral) ---
    if (mobileMenuOpen && sideNav) {
        mobileMenuOpen.addEventListener('click', () => {
            sideNav.classList.add('active');
        });
    }

    if (mobileMenuClose && sideNav) {
        mobileMenuClose.addEventListener('click', () => {
            sideNav.classList.remove('active');
        });
    }

    // Fermeture si on clique n'importe où en dehors du menu
    document.addEventListener('click', (event) => {
        if (sideNav && sideNav.classList.contains('active')) {
            if (!sideNav.contains(event.target) && !mobileMenuOpen.contains(event.target)) {
                sideNav.classList.remove('active');
            }
        }
    });
});