//1. Maak een 'Zoek'-knop op de pagina en koppel deze aan een functie die de gegevens over `België` ophaalt en dit in de console logt.

const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', fetchCountry);

const countryContainer = document.getElementById("country-container");

//8. Maak een inputveld op de pagina en zorg ervoor dat als de gebruiker op enter drukt, de functie wordt
// aangeroepen waarmee de gegevens over `België` worden opgehaald.

//9. Zorg ervoor dat de waarde uit het input veld wordt gebruikt als query voor het GET request.

const searchBar = document.getElementById("search-bar");

let query = '';

searchBar.addEventListener('keyup', function(e) {
    query = e.target.value;
    if (e.keyCode === 13) {
        e.preventDefault();
        fetchCountry();
    }
});


//een functie die de gegevens over `België` ophaalt en dit in de console logt.

async function fetchCountry() {
//10. Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht.
    searchBar.value = '';

//11. Zorg ervoor dat er altijd maar één zoekresultaat op de pagina staat.
    const previousSearch = document.getElementById('countryDiv');

    if (previousSearch) {
        countryContainer.removeChild(previousSearch);
    }

//12. Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding in de DOM wordt gezet.
//_Tip:_ als er een ongeldige API call wordt gemaakt, zal de response in het `catch` blok terecht komen.
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = '';

    try {
        const result = await axios.get(
            `https://restcountries.eu/rest/v2/name/${query}?fullText=true)`);
        const countryInfo = result.data[0];

        console.log(countryInfo);

//2. Maak op basis van de response de volgende string en log dit in de console: `[country-naam] is situated in [subarea-name]. It has a population of [amount] people.`
        const countryDescriptionBuilder = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;

//3. Maak op basis van de response de volgende string en log dit in de console: `The capital is [city]`
        const countryCapitalBuilder = `The capital is ${countryInfo.capital}`

        //4. Maak een functie die ongeacht het aantal currencies die in een land gebruikt worden, een string maakt:
        //* 1 valuta: `and you can pay with [currency]'s`
        //* 2 valuta's: `and you can pay with [currency]'s and [currency]'s`
        //* 3 valuta's: `and you can pay with [currency]'s, [currency]'s and [currency]'s`
        const currencyStringBuilder = countryInfo.currencies.reduce((acc, currency, idx) => {
            if (countryInfo.currencies.length === 1 || idx === 0) {
                return `${acc} ${currency.name}'s`;
            }
            if (idx !== countryInfo.currencies.length -1 && idx !==0) {
                return `${acc}, ${currency.name}'s`;
            }
            if (idx === countryInfo.currencies.length -1) {
                return `${acc} and ${currency.name}'s`;
            }
        }, 'and you can pay with');

//5. Check of alles nog steeds werkt als je de gegevens over _Aruba_ of _Duitsland_ ophaalt.
//6. Maak een functie die ongeacht het aantal talen die in een land gesproken worden, een string maakt:
//* 1 taal: `They speak [language]`
//* 2 talen: `They speak [language] and [language]`
//* 3 talen: `They speak [language], [language] and [language]`

        const languageStringBuilder = countryInfo.languages.reduce((acc, language, idx) => {
            if (countryInfo.languages.length === 1 || idx === 0) {
                return `${acc} ${language.name}`;
            }
            if (idx !== countryInfo.languages.length -1 && idx !==0) {
                return `${acc}, ${language.name}`;
            }
            if (idx === countryInfo.languages.length -1) {
                return `${acc} and ${language.name}`;
            }
        }, 'They speak');

        /*7. Zorg ervoor dat de opgehaalde data op de volgende manier wordt toegevoegd aan de DOM:
        [IMAGE: flag]
        [country-name]
        [country-naam] is situated in [subarea-name]. It has a population of [amount] people.
        The capital is [city] and you can pay with [currency]'s
        They speak [language], [language] and [language]
        */
        const countryDiv = document.createElement("div");
        countryDiv.setAttribute('id', 'countryDiv');

        const countryFlag = document.createElement("img");
        countryFlag.setAttribute("src", countryInfo.flag);
        countryFlag.setAttribute("width", "200px");
        countryDiv.appendChild(countryFlag);

        const countryName = document.createElement("h1");
        countryName.textContent = countryInfo.name;
        countryDiv.appendChild(countryName);

        const countryDescription = document.createElement("p");
        countryDescription.textContent = countryDescriptionBuilder;
        countryDiv.appendChild(countryDescription);

        const countryCapitalAndCurrency = document.createElement("p");
        countryCapitalAndCurrency.textContent = `${countryCapitalBuilder} ${currencyStringBuilder}.`;
        countryDiv.appendChild(countryCapitalAndCurrency);

        const countryLanguage = document.createElement("p");
        countryLanguage.textContent = `${languageStringBuilder}.`;
        countryDiv.appendChild(countryLanguage);

        return countryContainer.appendChild(countryDiv);

        } catch (e) {
        errorMessage.textContent = `That's not a country dummy!`
        console.error(e);
    }
}



