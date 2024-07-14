// Функція, яка отримує api НБУ
async function getCurrencies () {
    const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    
    const response = await fetch(url);
    const data = await response.json(); // json перетворюємо в обєкт js 
    const result = await data; //достаємо js обєкт з проміса
    console.log(result);
    
}

getCurrencies();

/*fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').then(function (result) {
    return result.json();
}).then(function (data) {
    console.log(data);
})*/
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

getCurrencies();