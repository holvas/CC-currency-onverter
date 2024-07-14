// Функція, яка отримує api НБУ
const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementPLN = document.querySelector('[data-value="PLN"]');

getCurrencies();

async function getCurrencies () {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    
    const response = await fetch(url);
    const data = await response.json(); // json перетворюємо в обєкт js 
    const result = await data; //достаємо js обєкт з проміса

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.PLN = result.Valute.PLN;

    console.log(rates);
    
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