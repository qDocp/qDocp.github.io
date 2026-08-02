const rarities = [
    { name: 'rare', probability: 40, adjective: 'Potion ' },
    { name: 'epic', probability: 25, adjective: 'Potion ' },
    { name: 'legendary', probability: 15, adjective: 'Potion ' },
    { name: 'divine', probability: 10, adjective: 'Potion ' },
    { name: 'cursed', probability: 7, adjective: 'Potion ' },
    { name: 'angelic', probability: 3, adjective: 'Potion ' }
];

const allPotionsData = {
    rare: [
        "de feu ardent", "de force", "de sagesse", "de saut", "de vitesse",
        "de chant de la forêt", "de lévitation", "de morphée", "d'ivresse",
        "de confusion", "de gravité", "de morsure céleste", "de nausée", "de poison"
    ],
    epic: [
        "de bouclier", "de régénération de vie", "d'invulnérabilité", "d'amour",
        "de chance", "de métamorphe", "de mirage", "briseur", "d'aveuglement",
        "de lenteur"
    ],
    legendary: [
        "de réapparition", "d'invisibilité", "de balance", "de changement",
        "de création", "de dons", "de porc épic"
    ],
    divine: [
        "de bénédiction des dieux", "d'étoile combo", "miroir", "de guillotin",
        "de sacrifice de sang"
    ],
    cursed: [
        "du Premier croc Malédiction de la vue", "du Deuxième croc Malédiction du toucher", "du Troisième croc Malédiction de la parole",
        "du Quatrième croc Malédiction des chaînes de la rancoeurs", "du Cinquième croc Malédiction de la chute"
    ],
    angelic: [
        "de L'archange de la justice", "de L'archange de la liberté", "de L'archange des émotions", "de L'archange du savoir",
        "de L'archange protecteur"
    ]
};

let displayedUniqueCursedPotions = new Set();
let displayedUniqueAngelicPotions = new Set();

// NOUVELLE FONCTION ULTRA RAPIDE (0 lag)
function getRandomPotion() {
    const availablePotions = [];
    let totalWeight = 0;

    for (const rarityKey in allPotionsData) {
        const rarityInfo = rarities.find(r => r.name === rarityKey);
        const baseWeight = rarityInfo.probability;

        allPotionsData[rarityKey].forEach(effectName => {
            if (rarityKey === 'cursed' && displayedUniqueCursedPotions.has(effectName)) return;
            if (rarityKey === 'angelic' && displayedUniqueAngelicPotions.has(effectName)) return;

            availablePotions.push({
                effect: effectName,
                imageName: effectName + '.png',
                rarity: rarityKey,
                weight: baseWeight
            });
            totalWeight += baseWeight;
        });
    }

    if (availablePotions.length === 0) {
        console.warn("Plus de potions disponibles.");
        return null;
    }

    let randomNum = Math.random() * totalWeight;
    for (const potion of availablePotions) {
        randomNum -= potion.weight;
        if (randomNum <= 0) {
            if (potion.rarity === 'cursed') displayedUniqueCursedPotions.add(potion.effect);
            if (potion.rarity === 'angelic') displayedUniqueAngelicPotions.add(potion.effect);
            return potion;
        }
    }
    return availablePotions[availablePotions.length - 1];
}

function createPotionCard() {
    const potion = getRandomPotion();
    if (!potion) return null;

    const potionRarityInfo = rarities.find(r => r.name === potion.rarity);
    const adjective = potionRarityInfo ? potionRarityInfo.adjective : 'Potion ';
    const cardName = `${adjective} ${potion.effect}`;

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container'); // On n'ajoute plus la classe ici directement

    const frontFace = document.createElement('div');
    frontFace.classList.add('potion-card');
    frontFace.innerHTML = `
        <h2>${cardName}</h2>
        <div class="rarity ${potion.rarity}">Rareté: ${potion.rarity.charAt(0).toUpperCase() + potion.rarity.slice(1)}</div>
        <button class="buy-button">Acheter</button>
    `;

    const buyButton = frontFace.querySelector('.buy-button');
    buyButton.addEventListener('click', () => {
        handlePurchase(cardContainer);
    });

    cardContainer.appendChild(frontFace);
    return cardContainer;
}

function playPurchaseSound() {
    const audio = new Audio('../audio/purchase.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Erreur lors de la lecture du son d'achat:", e));
}

function handlePurchase(cardContainer) {
    const frontFace = cardContainer.querySelector('.potion-card');
    if (frontFace) {
        frontFace.classList.add('purchased-effect');
    }

    const buyButton = cardContainer.querySelector('.buy-button');
    if (buyButton) {
        buyButton.disabled = true;
        buyButton.textContent = 'Acheté !';
        buyButton.style.backgroundColor = '#6c757d';
        buyButton.style.cursor = 'not-allowed';
    }

    playPurchaseSound();
}

function populateShop(numCards = 5) {
    const shopContainer = document.getElementById('potionShop');
    if (!shopContainer) return;

    shopContainer.innerHTML = '';
    displayedUniqueCursedPotions.clear();
    displayedUniqueAngelicPotions.clear();

    const totalUniquePotionTypes = Object.values(allPotionsData).flat().length;
    const cardsToGenerate = Math.min(numCards, totalUniquePotionTypes);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardsToGenerate; i++) {
        const cardContainer = createPotionCard();
        if (cardContainer) {
            setTimeout(() => {
                // L'animation est ajoutée sur le conteneur, pas sur la carte, pour ne pas faire bugger la carte graphique
                cardContainer.classList.add('flip-in');
            }, i * 100);
            fragment.appendChild(cardContainer);
        } else {
            break;
        }
    }
    shopContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

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

    populateShop();

    const refreshButton = document.getElementById('refreshPotions');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            populateShop();
        });
    }
});