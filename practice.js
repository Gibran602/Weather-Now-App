const cityInputField = document.getElementById("city-input");
const weatherApiKey = "deaec171e2bd2c79e36050357207163d";
const searchButton = document.getElementById("search-btn");
const weatherData = document.getElementById("weather-data");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const input = cityInputField.value.trim();

  const [city, countryCode] = input.split(",").map((item) => item.trim());

  let apiUrl;
  if (!city) {
    alert("Please enter a valid city name");
    return;
  }
  if (!countryCode) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`;
  } else if (!/^[A-Z]{2}$/.test(countryCode)) {
    alert("Please enter a valid country code (e.g. US)");
    return;
  } else {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${countryCode}&appid=${weatherApiKey}&units=imperial`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      const { main, name, sys, weather } = weatherData;
      const weatherContainer = document.getElementById("weather-data");
      const iconSrc = `/icons/${weather[0].icon}.svg`;
      console.log(weatherData);

      weatherContainer.innerHTML = `
          <img src="${iconSrc}" alt="weather icon" class="weather-svg"/>
          <h2>${name}, <span class="country-code">${sys.country}</span></h2>
          <h3>${weather[0].description.toUpperCase()} <span class="temperature">${Math.round(
        main.temp
      )}<sup>°F</sup></span></h3>
      <h3>HUMIDITY <span class="temperature">${main.humidity}%</span></h3>
          <h3>FEELS LIKE <span class="temperature">${Math.round(
            main.feels_like
          )}<sup>°F</sup></span></h3>
      `;
    });
  weatherData.classList.add("visible-weather-data");
  cityInputField.value = "";
  cityInputField.focus();
});
