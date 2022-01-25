import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

// building in Fetch API in order to search out all the countries
const DEBOUNCE_DELAY = 300;
let countries;
const fetchCountries = async () => {
  countries = await fetch(
    'https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages',
  ).then(res => res.json());
};

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const fields = 'fields=name,capital,population,flags,languages';

// going to call our fetchCountries function
const results = document.getElementById('results');
const showCountries = async () => {
  // get the data
  await fetchCountries();
  const ul = document.createElement('ul');
  ul.classList.add('countries');

  countries.forEach(country => {
    // creating the structure
    const li = document.createElement('li');
    li.classList.add('country-item');

    const country_flag = document.createElement('img');
    // setting the image source
    country_flag.src = country.flag;
    country_flag.classList.add('country-flag');

    const country_name = document.createElement('h3');
    country_name.innerText = country.name;
    country_name.classList.add('country-name');

    const country_info = document.createElement('div');
    country_info.classList.add('country-info');

    const country_population = document.createElement('h2');
    country_population.innerText = numberWithCommas(country.population);
    country_population.classList.add('country-population');

    const country_population_text = document.createElement('h5');
    country_population_text.innerText = 'Population';
    country_population_text.classList.add('country-population-text');

    country_info.appendChild(country_population);
    country_info.appendChild(country_population_text);

    li.appendChild(country_flag);
    li.appendChild(country_name);
    li.appendChild(country_info);
    ul.appendChild(li);
  });
  results.appendChild(ul);

  // display initial countries
  showCountries();
};

const search_input = document.getElementById('search');

let search_term = '';
search_input.addEventListener('input', e => {
  // saving the input value
  search_term = e.target.value;

  // re-displaying countries basedon the new search_term
  showCountries();
});

// const showCountries = async () => {
//   results.innerHTML = '';
// };

// see code above at Step 2
countries
  .filter(country => country.name.toLowerCase().includes(search_term.toLowerCase()))
  .forEach(country => {
    // see code above at Step 2
  });
