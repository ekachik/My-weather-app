function formattedDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
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
    "February",
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
  let formattedDate = `${day}, ${date} ${month}`;
  return formattedDate;
}

function formattedTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

function formatSixDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displaySixDaysForecast(response) {
  let forecast = response.data.daily;

  let sixDaysForecastElement = document.querySelector("#six-days-forecast");

  let sixDaysForecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      sixDaysForecastHTML =
        sixDaysForecastHTML +
        `
      <div class="col-2">
         <div class = "six-days-forecast-weekday">
          ${formatSixDays(forecastDay.dt)}
         </div>
         <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />

             <div class="six-days-temperatures">
                  <span class="six-days-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="six-days-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
            </div>    
      </div>
  `;
    }
  });

  sixDaysForecastHTML = sixDaysForecastHTML + `</div>`;
  sixDaysForecastElement.innerHTML = sixDaysForecastHTML;
}

function getSixDaysForecast(coordinates) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySixDaysForecast);
}

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let pressureElement = document.querySelector("#pressure");
  let humiidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
  humiidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formattedDate(response.data.dt * 1000);
  timeElement.innerHTML = formattedTime(response.data.dt * 1000);

  getSixDaysForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");
