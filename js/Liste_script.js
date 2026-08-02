document.addEventListener('DOMContentLoaded', () => {
    const LAST_CATEGORY_KEY = 'lastCategory';
    const DEFAULT_CATEGORY = 'positives';

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const categoryLinks = document.querySelectorAll('.category-item');
    const potionCategories = document.querySelectorAll('.potions-category');
    const currentCategoryTitle = document.getElementById('current-category-title');

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

    function showCategory(categoryToShow) {
        potionCategories.forEach(categoryDiv => {
            categoryDiv.classList.add('hidden');
        });

        const targetCategoryDiv = document.getElementById(`potions-${categoryToShow}`);
        if (targetCategoryDiv) {
            targetCategoryDiv.classList.remove('hidden');
        }

        const categoryTextElement = document.querySelector(`[data-category="${categoryToShow}"]`);
        if (categoryTextElement) {
            currentCategoryTitle.textContent = categoryTextElement.textContent;
        }
    }

    function updateActiveCategory(clickedLink) {
        categoryLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const category = link.dataset.category;
            showCategory(category);
            updateActiveCategory(link);
            localStorage.setItem(LAST_CATEGORY_KEY, category);
        });
    });

    const lastCategory = localStorage.getItem(LAST_CATEGORY_KEY);
    let categoryToLoad = DEFAULT_CATEGORY;
    let activeLinkElement = document.querySelector(`.category-item[data-category="${DEFAULT_CATEGORY}"]`);

    if (lastCategory && document.querySelector(`.category-item[data-category="${lastCategory}"]`)) {
        categoryToLoad = lastCategory;
        activeLinkElement = document.querySelector(`.category-item[data-category="${lastCategory}"]`);
    }

    showCategory(categoryToLoad);
    updateActiveCategory(activeLinkElement);
});