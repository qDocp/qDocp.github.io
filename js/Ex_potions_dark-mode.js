document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    body.classList.add('no-transition');

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

    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                const currentBox = header.parentElement;
                const isActive = currentBox.classList.contains('active');

                document.querySelectorAll('.info-box').forEach(box => {
                    box.classList.remove('active');
                });

                if (!isActive) {
                    currentBox.classList.add('active');
                }
            }
        });
    });
});