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
  celesiusLink.classList.remove("active");
  fahrenheit.classList.add("active");

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
  celesiusLink.classList.add("active");
  fahrenheit.classList.remove("active");
}

function getForecast(coordinates) {
  let apiKey = "d73d79dd42b2b87a48a2c2e4799d500a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return `${hours}:${mins}`;
}

function showWeather(response) {
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

  document.querySelector("#sunrise").innerHTML = formatHours(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatHours(
    response.data.sys.sunset * 1000
  );

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="col-days-first">${formatDay(forecastDay.dt)}</div>
<div class="col-pic"> <img src= "images/${
          forecastDay.weather[0].icon
        }.png" alt="Sunny Weather" class="sunny"/></div>
<div class="col-temp-1">${Math.round(forecastDay.temp.max)}°C/ ${Math.round(
          forecastDay.temp.min
        )}°C</div> </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
