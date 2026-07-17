document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuOpen = document.getElementById('mobileMenuOpen');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const sideNav = document.getElementById('sideNav');

    // Ouverture du menu latéral
    if (mobileMenuOpen && sideNav) {
        mobileMenuOpen.addEventListener('click', () => {
            sideNav.classList.add('active');
        });
    }

    // Fermeture du menu latéral via la flèche "Retour"
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