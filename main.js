// створюємо обєкт необхідних даних з JSON обєкту
const rates = {}; 
// елементи для відображення курсу валют
const elementUSD = document.querySelector('[data-value="USD"]'); // знаходимо конкретні діви
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementPLN = document.querySelector('[data-value="PLN"]');
// елементи форми, введення суми, вибір валюти, поле з результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();
setInterval(getCurrencies, 3600000) // щогодинне оновлення даних 

// функція отримання курсу валют (за допомогою api НБУ) та відображення їх на сторінці
async function getCurrencies() {
    const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    
    try {
        const response = await fetch(url); // асинхронне звернення до json (отримуємо Promise)
        const data = await response.json(); // json перетворюємо в обєкт js 

        // будуємо об'єкт тільки з трьох валют
        rates.USD = data.find(currency => currency.cc === 'USD');
        rates.EUR = data.find(currency => currency.cc === 'EUR');
        rates.PLN = data.find(currency => currency.cc === 'PLN');

        console.log(rates);

        // передаємо дані з api до div
        elementUSD.textContent = rates.USD.rate.toFixed(2); //скорочуємо число після крапки до 2
        elementEUR.textContent = rates.EUR.rate.toFixed(2);
        elementPLN.textContent = rates.PLN.rate.toFixed(2);
        
        // Додаткові стилі для зміни кольору можна додати за необхідністю
        
    } catch (error) {
        console.error('Помилка отримання даних:', error);
    }
}

// слухаємо зміни в полях input та select
input.oninput = convertValue;
select.oninput = convertValue; 

// функція, конвертації значення на основі селекту
function convertValue() {
    if (!rates[select.value]) {
        result.value = '0.00';
        return;
    }
    result.value = (parseFloat(input.value) / rates[select.value].rate).toFixed(2);
}


// =============================================
/*
const rates = {}; // створюємо обєкт необхідних даних з JSON обєкту
const elementUSD = document.querySelector('[data-value="USD"]'); // знаходимо конкретні діви
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementPLN = document.querySelector('[data-value="PLN"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


getCurrencies();

// Беремо вхідні дані (функція, яка отримує api НБУ) 
async function getCurrencies() {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    
    const response = await fetch(url); // асинхроне звернення до json (отримуємо Promise)
    const data = await response.json(); // json перетворюємо в обєкт js 
    const result = await data; // достаємо js обєкт з promise

    // будуємо обєкт тільки з трьох валют
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.PLN = result.Valute.PLN;

    console.log(rates);

    // передаємо дані з api до div
    elementUSD.textContent = rates.USD.Value.toFixed(2); //скорочуємо число після крапки до 2
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementPLN.textContent = rates.PLN.Value.toFixed(2);

    // Перевиряємо курс USD з попереднім днем
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top'); // додаємо клас top
    } else {
        elementUSD.classList.add('bottom'); // додаємо клас bottom
    }

    // Перевиряємо курс EUR з попереднім днем
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top'); 
    } else {
        elementEUR.classList.add('bottom');
    }

    // Перевиряємо курс PLN з попереднім днем
    if (rates.PLN.Value > rates.PLN.Previous) {
        elementPLN.classList.add('top'); 
    } else {
        elementPLN.classList.add('bottom');
    }
}

// Cлухаємо зміни в input 
input.oninput = convertValue;

// Cлухаємо зміни в select 
select.oninput = convertValue;

//функція, яка конвертирує значення на основі селекту
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}
*/