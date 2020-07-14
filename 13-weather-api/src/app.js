import * as data from './data.js';

// const cityElement = document.querySelector('h1');
// const weatherTitleElement = document.querySelector('p');
// const temperatureElement = document.querySelector('h2');
const cityForm = document.querySelector('form');
const cityInput = document.querySelector('input');

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, error);
}

async function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`Latitude : ${latitude} & Logitude : ${longitude} `);
  data.getLocationWeather(latitude, longitude);
  // cityElement.innerText = data.weather.city;
  console.log(data.weather);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (cityInput === null || cityInput === '') return;
  console.log(cityInput.value.toLowerCase());
  data.getCityWeather(cityInput.value.toLowerCase());
  cityInput.value = '';
});
