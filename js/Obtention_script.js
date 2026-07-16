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

function getRandomPotion() {
    const allPossiblePotions = [];

    const availableCursedPotions = allPotionsData.cursed.filter(
        p => !displayedUniqueCursedPotions.has(p)
    );
    const availableAngelicPotions = allPotionsData.angelic.filter(
        p => !displayedUniqueAngelicPotions.has(p)
    );

    const totalCursed = allPotionsData.cursed.length;
    const totalAngelic = allPotionsData.angelic.length;

    const remainingCursedWeight = availableCursedPotions.length > 0
        ? rarities.find(r => r.name === 'cursed').probability * (availableCursedPotions.length / totalCursed)
        : 0;
    const remainingAngelicWeight = availableAngelicPotions.length > 0
        ? rarities.find(r => r.name === 'angelic').probability * (availableAngelicPotions.length / totalAngelic)
        : 0;

    let weightedPotions = [];

    for (const rarityKey in allPotionsData) {
        if (rarityKey !== 'cursed' && rarityKey !== 'angelic') {
            const rarityInfo = rarities.find(r => r.name === rarityKey);
            allPotionsData[rarityKey].forEach(effectName => {
                for (let i = 0; i < rarityInfo.probability; i++) {
                    weightedPotions.push({
                        effect: effectName,
                        imageName: effectName + '.png',
                        rarity: rarityKey
                    });
                }
            });
        }
    }
    if (remainingCursedWeight > 0) {
        availableCursedPotions.forEach(effectName => {
            for (let i = 0; i < Math.max(1, Math.round(remainingCursedWeight)); i++) {
                weightedPotions.push({
                    effect: effectName,
                    imageName: effectName + '.png',
                    rarity: 'cursed'
                });
            }
        });
    }
    if (remainingAngelicWeight > 0) {
        availableAngelicPotions.forEach(effectName => {
            for (let i = 0; i < Math.max(1, Math.round(remainingAngelicWeight)); i++) {
                weightedPotions.push({
                    effect: effectName,
                    imageName: effectName + '.png',
                    rarity: 'angelic'
                });
            }
        });
    }
    if (weightedPotions.length === 0) {
        console.warn("Plus de potions disponibles pour le tirage dans cette session ou aucune potion n'est définie.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * weightedPotions.length);
    const selectedPotion = weightedPotions[randomIndex];

    if (selectedPotion.rarity === 'cursed') {
        displayedUniqueCursedPotions.add(selectedPotion.effect);
    } else if (selectedPotion.rarity === 'angelic') {
        displayedUniqueAngelicPotions.add(selectedPotion.effect);
    }

    return selectedPotion;
}


function generateRarity() {
    const totalProbability = rarities.reduce((sum, r) => sum + r.probability, 0);
    let randomNum = Math.random() * totalProbability;
    let currentProbability = 0;

    for (const rarity of rarities) {
        currentProbability += rarity.probability;
        if (randomNum <= currentProbability) {
            return rarity;
        }
    }
    return rarities[0];
}

function createPotionCard() {
    const potion = getRandomPotion();
    if (!potion) {
        console.error("Impossible de créer une carte: aucune potion disponible dans la liste.");
        return null;
    }

    const potionRarityInfo = rarities.find(r => r.name === potion.rarity);
    const adjective = potionRarityInfo ? potionRarityInfo.adjective : 'Potion ';

    const effectName = potion.effect;
    const cardName = `${adjective} ${effectName}`;

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

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
}

function populateShop(numCards = 5) {
    const shopContainer = document.getElementById('potionShop');
    if (!shopContainer) {
        console.error("Le conteneur de la boutique (#potionShop) n'a pas été trouvé.");
        return;
    }

    shopContainer.innerHTML = '';

    displayedUniqueCursedPotions = new Set();
    displayedUniqueAngelicPotions = new Set();

    const totalUniquePotionTypes = Object.values(allPotionsData).flat().length;
    const cardsToGenerate = Math.min(numCards, totalUniquePotionTypes);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardsToGenerate; i++) {
        const cardContainer = createPotionCard();
        if (cardContainer) {
            setTimeout(() => {
                cardContainer.querySelector('.potion-card')?.classList.add('flip-in');
            }, i * 100);
            fragment.appendChild(cardContainer);
        } else {
            console.warn(`Moins de cartes générées que demandé (${i} au lieu de ${cardsToGenerate}) car plus de potions disponibles ou un problème est survenu.`);
            break;
        }
    }
    shopContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
    populateShop();

    const refreshButton = document.getElementById('refreshPotions');
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            populateShop();
        });
    } else {
        console.warn("Bouton avec l'ID 'refreshPotions' non trouvé. La fonction d'actualisation manuelle pourrait ne pas fonctionner.");
    }
});

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

function playPurchaseSound() {
    const audio = new Audio('../audio/purchase.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Erreur lors de la lecture du son d'achat:", e));
}