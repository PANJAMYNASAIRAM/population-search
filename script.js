let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let resultCountries = document.getElementById("resultCountries");

let countriesData = [];

// 🔹 Create and Append Countries
function createAndAppend(result) {
    resultCountries.textContent = "";

    for (let country of result) {
        let container = document.createElement("div");

        let flagImage = document.createElement("img");
        flagImage.src = country.flag;
        flagImage.classList.add("country-flag");

        let countryName = document.createElement("p");
        countryName.textContent = country.name;
        countryName.classList.add("country-name");

        let countryPopulation = document.createElement("p");
        countryPopulation.textContent = "Population: " + country.population;

        container.appendChild(flagImage);
        container.appendChild(countryName);
        container.appendChild(countryPopulation);

        resultCountries.appendChild(container);
    }
}

// 🔹 Fetch Data on Page Load
function getCountriesData() {
    spinner.classList.remove("d-none");

    let url = "https://apis.ccbp.in/countries-data";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            countriesData = jsonData;
            createAndAppend(countriesData);
        });
}

// 🔹 Filter Countries
function filterCountries(event) {
    let searchVal = event.target.value.toLowerCase();

    let filteredData = countriesData.filter(function(country) {
        return country.name.toLowerCase().includes(searchVal);
    });

    createAndAppend(filteredData);
}

// 🔹 Events
searchInput.addEventListener("input", filterCountries);

// 🔹 Initial Call
getCountriesData(); 

