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
let hour = curentTime.getHours();
let min = curentTime.getUTCMinutes();
curentDay.innerHTML = `${day}`;
let curentHour = document.querySelector(".curentHour");
curentHour.innerHTML = `${hour}`;
let curentMin = document.querySelector(".curentMin");
curentMin.innerHTML = `${min}`;

function displayWeaterCondition(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.querySelector(".feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".weatherDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".tempMax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".tempMin").innerHTML = Math.round(
    response.data.main.temp_min
  );
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
  let convertTemp = document.querySelector(".temp");
  convertTemp.innerHTML = "66";
}
let convertFar = document.querySelector("#fahrenheit");
convertFar.addEventListener("click", convert);

function convert2(event) {
  event.preventDefault();
  let convertTemp2 = document.querySelector(".temp");
  convertTemp2.innerHTML = "19";
}
let convertCel = document.querySelector("#celsius");
convertCel.addEventListener("click", convert2);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Kyiv");