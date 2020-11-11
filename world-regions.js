/*const infoContainer = document.getElementById("info-container");

async function fetchCountries() {
    try {
        const result = await axios.get(
            'https://restcountries.eu/rest/v2/all'
        )
        const {data} = result;
        console.log(data);

        data.sort((a, b) => a.population - b.population);

        data.map(({name, population, region, flag}) => {


            const countryDiv = document.createElement('li');
            countryDiv.setAttribute('class', 'country-div');

            const countryFlag = document.createElement('img');
            countryFlag.setAttribute('src', flag);
            countryFlag.setAttribute('width', '25px');
            countryDiv.appendChild(countryFlag);

            const countryName = document.createElement('span');
            countryName.setAttribute('class', getColorRegion(region));
            countryName.textContent = name;
            countryDiv.appendChild(countryName);

            countryDiv.addEventListener('click', function(e) {

                const populationText = document.getElementById(`population-${name}`);

                if (populationText) {
                    countryDiv.removeChild(populationText);
                }
                else {
                    const countryPopulation = document.createElement('p');
                    countryPopulation.setAttribute('class', 'country-population');
                    countryPopulation.setAttribute('id', `population-${name}`);
                    countryPopulation.textContent = `Has a population of ${population}`;
                    countryDiv.appendChild(countryPopulation);
                }
            });



            infoContainer.appendChild(countryDiv);
        });
    }
    catch (e) {
        console.log('Jammer joh')
    }
}

fetchCountries();

function getColorRegion(region) {
    switch (region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}
*/