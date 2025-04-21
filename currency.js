// Taux de change (à mettre à jour régulièrement via une API)
const exchangeRates = {
    'HTG': 132.5, // Taux approximatif USD vers HTG
    'USD': 1,     // USD (base)
    'EUR': 0.92   // Taux approximatif USD vers EUR
};

// Fonction pour détecter la localisation de l'utilisateur
async function detectUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.error('Erreur de détection de localisation:', error);
        return 'HT'; // Par défaut, on utilise Haïti
    }
}

// Fonction pour convertir les prix
function convertPrices(currency) {
    const prices = document.querySelectorAll('[data-price]');
    const rate = exchangeRates[currency] || 1;
    
    prices.forEach(element => {
        const originalPrice = parseFloat(element.getAttribute('data-price'));
        const convertedPrice = (originalPrice * rate).toFixed(2);
        
        if (currency === 'HTG') {
            element.textContent = `${convertedPrice} HTG (${originalPrice} USD)`;
        } else if (currency === 'EUR') {
            element.textContent = `${convertedPrice} EUR (${originalPrice} USD)`;
        } else {
            element.textContent = `${originalPrice} USD`;
        }
    });
}

// Fonction principale
async function initializeCurrencyConversion() {
    const countryCode = await detectUserLocation();
    let currency = 'USD'; // Devise par défaut
    
    if (countryCode === 'HT') {
        currency = 'HTG';
    } else if (['FR', 'BE', 'DE', 'IT', 'ES'].includes(countryCode)) {
        currency = 'EUR';
    }
    
    convertPrices(currency);
}

// Initialiser la conversion au chargement de la page
document.addEventListener('DOMContentLoaded', initializeCurrencyConversion); 