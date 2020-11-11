//1. Maak een 'Zoek'-knop op de pagina en koppel deze aan een functie die de gegevens over `België` ophaalt en dit in de console logt.

const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', fetchCountry);

const countryContainer = document.getElementById("info-wrapper");

//8. Maak een inputveld op de pagina en zorg ervoor dat als de gebruiker op enter drukt, de functie wordt
// aangeroepen waarmee de gegevens over `België` worden opgehaald.

//9. Zorg ervoor dat de waarde uit het input veld wordt gebruikt als query voor het GET request.

const searchBar = document.getElementById("search-bar");

let query = '';

searchBar.addEventListener('keyup', function (e) {
    query = e.target.value;
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchCountry();
    }
});


//een functie die de gegevens over `België` ophaalt en dit in de console logt.

async function fetchCountry() {
    //10. Zorg ervoor dat de waarde van het input veld wordt leeggemaakt na elke zoekopdracht.
    searchBar.value = '';

    //11. Zorg ervoor dat er altijd maar één zoekresultaat op de pagina staat.
    const previousSearch = document.getElementById('country-info');

    if (previousSearch) {
        countryContainer.removeChild(previousSearch);
    }

    //13. Zorg ervoor dat als je na een ongeldige API call weer een geldige API call maakt, de foutmelding verdwenen is.
    const gifContainer = document.getElementById("gif-container");
    //gifContainer.removeAttribute('src');
    gifContainer.classList.remove('show');

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
            if (idx !== countryInfo.currencies.length - 1 && idx !== 0) {
                return `${acc}, ${currency.name}'s`;
            }
            if (idx === countryInfo.currencies.length - 1) {
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
            if (idx !== countryInfo.languages.length - 1 && idx !== 0) {
                return `${acc}, ${language.name}`;
            }
            if (idx === countryInfo.languages.length - 1) {
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
        const countryDiv = document.createElement('div');
        countryDiv.setAttribute('id', 'country-info');

        /*const spinningWorld = document.getElementById('earth-gif');
        //<img id="earth-gif" src="https://images.squarespace-cdn.com/content/v1/5f63b41e6faf340e84cd9234/1600642437243-DMW3CWN68RHMPX0789P0/ke17ZwdGBToddI8pDm48kO4CTvG-DFvYHY5k3EOM7_xZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyvkASp24nP-_9_SHIzxUFkrTAOgziZ9v1Pa1JNPFSdJ7Ch0UtqSOSOeDjW-E2sqOE/rotation.gif?format=300w">
        if (spinningWorld.src != 'https://i.ibb.co/gDjzvkh/The-World-is-Spinning.png'){
            spinningWorld.src = 'https://i.ibb.co/gDjzvkh/The-World-is-Spinning.png';
        }
        else {
            spinningWorld.src = "https://images.squarespace-cdn.com/content/v1/5f63b41e6faf340e84cd9234/1600642437243-DMW3CWN68RHMPX0789P0/ke17ZwdGBToddI8pDm48kO4CTvG-DFvYHY5k3EOM7_xZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyvkASp24nP-_9_SHIzxUFkrTAOgziZ9v1Pa1JNPFSdJ7Ch0UtqSOSOeDjW-E2sqOE/rotation.gif?format=300w";
        }*/

        const countryFlag = document.createElement('img');
        countryFlag.setAttribute('src', countryInfo.flag);
        countryFlag.setAttribute('width', '150px');
        countryDiv.appendChild(countryFlag);

        const countryName = document.createElement('h1');
        countryName.textContent = countryInfo.name;
        countryDiv.appendChild(countryName);

        const countryDescription = document.createElement('p');
        countryDescription.textContent = countryDescriptionBuilder;
        countryDiv.appendChild(countryDescription);

        const countryCapitalAndCurrency = document.createElement('p');
        countryCapitalAndCurrency.textContent = `${countryCapitalBuilder} ${currencyStringBuilder}.`;
        countryDiv.appendChild(countryCapitalAndCurrency);

        const countryLanguage = document.createElement('p');
        countryLanguage.textContent = `${languageStringBuilder}.`;
        countryDiv.appendChild(countryLanguage);

        return countryContainer.appendChild(countryDiv);

        //12. Zorg ervoor dat als er naar een land wordt gezocht dat niet bestaat, er een foutmelding in de DOM wordt gezet.
        //_Tip:_ als er een ongeldige API call wordt gemaakt, zal de response in het `catch` blok terecht komen.

    } catch (e) {
        console.error(e);
        // gifContainer.setAttribute('src', 'https://d.wattpad.com/story_parts/837710361/images/15f26e80b98996db696933165236.gif');
        gifContainer.classList.add('show');
    }
}
