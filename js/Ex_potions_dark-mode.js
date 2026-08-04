document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Éléments du menu latéral sur mobile
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('potionSidebar');

    body.classList.add('no-transition');

    // Gestion du mode sombre
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
    }

    // Gestion de l'ouverture et fermeture du menu latéral (Mobile)
    if (openSidebarBtn && closeSidebarBtn && sidebar) {
        openSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            body.style.overflow = 'hidden'; // Empêche l'arrière-plan de scroller
        });

        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            body.style.overflow = ''; // Réactive le scroll de la page
        });
    }
});