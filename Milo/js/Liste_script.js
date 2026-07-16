document.addEventListener('DOMContentLoaded', () => {
    // --- Constantes ---
    const DARK_MODE_KEY = 'darkMode';
    const LAST_CATEGORY_KEY = 'lastCategory';
    const DARK_MODE_CLASS = 'dark-mode';
    const DEFAULT_CATEGORY = 'positives';

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    const categoryLinks = document.querySelectorAll('.category-item');
    const potionCategories = document.querySelectorAll('.potions-category');
    const currentCategoryTitle = document.getElementById('current-category-title');

    function updateMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add(DARK_MODE_CLASS);
        } else {
            body.classList.remove(DARK_MODE_CLASS);
        }
        localStorage.setItem(DARK_MODE_KEY, isDarkMode);
    }

    let initialDarkMode = false;
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);

    if (savedDarkMode !== null) {
        initialDarkMode = savedDarkMode === 'true';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialDarkMode = true;
    }
    updateMode(initialDarkMode);

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains(DARK_MODE_CLASS);
        updateMode(!isDarkMode);
    });

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