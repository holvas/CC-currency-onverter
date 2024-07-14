const rates = {}; // створюємо обєкт необхідних даних з JSON обєкту
const elementUSD = document.querySelector('[data-value="USD"]'); // знаходимо конкретні діви
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementPLN = document.querySelector('[data-value="PLN"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


getCurrencies();

// Беремо вхідні дані (функція, яка отримує api НБУ) 
async function getCurrencies () {
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
input.oninput = function() {
    console.log('Changed!');
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}

// Cлухаємо зміни в select 
select.oninput = function() {
    console.log('Changed!');
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}


// ============================================================================
// async function getCurrencies () {
//     const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
//     try {
//         const response = await fetch(url);
//         const data = await response.json(); // json перетворюємо в обєкт js 
//         console.log(data);
//         return data;
//         // const result = await data; //достаємо js обєкт з проміса
//         // console.log(result);
//         //console.log(result);}
//     } catch (error) {
//         console.error('Fetch error', error);
//     }
// }

//===============================================================================
/* 
//CURRENCY NBU 
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
    
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerText = "Будь ласка, введіть коректну суму.";
        return;
    }

    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();

        // Знайти курс обраної валюти
        const currencyData = data.find(item => item.cc === currency);
        
        if (!currencyData) {
            document.getElementById('result').innerText = "Не вдалося знайти курс для обраної валюти.";
            return;
        }
        
        const rate = currencyData.rate;
        const result = amount * rate;

        document.getElementById('result').innerText = `${amount} ${currency} = ${result.toFixed(2)} UAH`;
    } catch (error) {
        document.getElementById('result').innerText = "Помилка завантаження даних. Спробуйте пізніше.";
    }
}

*/