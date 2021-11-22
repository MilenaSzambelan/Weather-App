let now = new Date();

let h4 = document.querySelector("h4");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Febebuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h4.innerHTML = `${day},  ${date}  ${month}  ${year}`;
let h3 = document.querySelector("h3");

h3.innerHTML = ` ${hours}:${minutes}`;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature2Element = document.querySelector("#temperature2");
  let mintempElement = document.querySelector("#mintemp");

  let fahrenheitTemp = (celesiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  temperature2Element.innerHTML = Math.round(fahrenheitTemp);
  mintempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelesiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature2Element = document.querySelector("#temperature2");
  let mintempElement = document.querySelector("#mintemp");

  temperatureElement.innerHTML = Math.round(celesiusTemp);
  temperature2Element.innerHTML = Math.round(celesiusTemp);
  mintempElement.innerHTML = Math.round(celesiusTemp);
}

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#town").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature2").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#mintemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;

  celesiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function find(city) {
  let apiKey = "d73d79dd42b2b87a48a2c2e4799d500a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  find(city);
}

function getLocalization(position) {
  let apiKey = "d73d79dd42b2b87a48a2c2e4799d500a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocalization);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

let localizationButton = document.querySelector("#location");
localizationButton.addEventListener("click", getLocation);

find("Tokyo");

let celesiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celesiusLink = document.querySelector("#celesius-link");
celesiusLink.addEventListener("click", showCelesiusTemperature);
