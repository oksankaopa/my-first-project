let curentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[curentTime.getDay()];
let curentDay = document.querySelector(".curentDay");
curentDay.innerHTML = `${day}`;

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecstHTML = `<div class="row">`;
  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay) {
    forecstHTML =
      forecstHTML +
      `<div class="col-2">
      <div class="forecast-day">${forecastDay.dt}</div>
            <img
            src="https://ssl.gstatic.com/onebox/weather/32/partly_cloudy.png"
            alt="cloud icon"
            class="forecast-icon"
            />
      <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
      </div>
    </div>`;
  });

  forecstHTML = forecstHTML + `</div>`;
  forecastElement.innerHTML = forecstHTML;
}
function formatDate(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  let min = time.getUTCMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=1fe44f0a5a94113867612fe7492577ab&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeaterCondition(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector(".temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".tempMax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".tempMin").innerHTML = Math.round(
    response.data.main.temp_min
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}
function searchCity(cityName) {
  let apiKey = "1fe44f0a5a94113867612fe7492577ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeaterCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-text-input").value;
  searchCity(cityName);
}
function searchLocation(position) {
  let apiKey = "1fe44f0a5a94113867612fe7492577ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeaterCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
function convert(event) {
  event.preventDefault();
  let farTemp = (celsiusTemp * 9) / 5 + 32;
  let convertTemp = document.querySelector(".temp");
  convertTemp.innerHTML = Math.round(farTemp);
}
let convertFar = document.querySelector("#fahrenheit");
convertFar.addEventListener("click", convert);

function convert2(event) {
  event.preventDefault();
  let convertTemp2 = document.querySelector(".temp");
  convertTemp2.innerHTML = Math.round(celsiusTemp);
}
let convertCel = document.querySelector("#celsius");
convertCel.addEventListener("click", convert2);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Kyiv");
let celsiusTemp = null;
