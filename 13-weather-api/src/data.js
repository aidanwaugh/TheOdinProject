const apiKey = '54fbd3eb6d11ef31a4574678c3bfb2d4';

const kelvin = 273;
const cityElement = document.querySelector('h1');
const weatherTitleElement = document.querySelector('p');
const temperatureElement = document.querySelector('h2');
export let weather = {
  temperature: '',
  title: '',
  city: '',
};

export function getLocationWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(api, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weather.temperature = Math.floor(response.main.temp - kelvin);
      weather.title = response.weather[0].main;
      weather.city = response.name;
      cityElement.innerText = weather.city;
      weatherTitleElement.innerText = weather.title;
      temperatureElement.innerText = weather.temperature;
      return weather;
    })
    .catch(function (err) {
      console.log(err);
    });
}

export function getCityWeather(cityName) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  fetch(api, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weather.temperature = Math.floor(response.main.temp - kelvin);
      weather.title = response.weather[0].main;
      weather.city = response.name;
      cityElement.innerText = weather.city;
      weatherTitleElement.innerText = weather.title;
      temperatureElement.innerText = weather.temperature;
      return weather;
    })
    .catch(function (err) {
      console.log(err);
    });
}
