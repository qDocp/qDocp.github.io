document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    // --- MODE SOMBRE ---
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
    }

    // --- ACCORDÉON SUR MOBILE (Une seule catégorie à la fois) ---
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            // L'accordéon ne s'active que si la largeur de l'écran est de 768px ou moins
            if(window.innerWidth <= 768) {
                const currentBox = header.parentElement;
                
                // On vérifie si la boîte sur laquelle on clique est DÉJÀ ouverte
                const isActive = currentBox.classList.contains('active');

                // 1. On commence par fermer TOUTES les boîtes
                document.querySelectorAll('.info-box').forEach(box => {
                    box.classList.remove('active');
                });

                // 2. Si la boîte cliquée n'était PAS déjà ouverte, on l'ouvre
                // (Si elle était déjà ouverte, elle restera fermée suite à l'étape 1)
                if (!isActive) {
                    currentBox.classList.add('active');
                }
            }
        });
    });
});