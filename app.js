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

function displaySixDaysForecast() {
  let sixDaysForecastElement = document.querySelector("#six-days-forecast");
  let days = ["Thu", "Fri", "Sat"];
  let sixDaysForecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    sixDaysForecastHTML =
      sixDaysForecastHTML +
      `
      <div class="col-2">
         <div class = "six-days-forecast-weekday">
          ${day}
         </div>
         <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt=""
                width="42"
              />

             <div class="six-days-temperatures">
                  <span class="six-days-temperature-max"> 18° </span>
                  <span class="six-days-temperature-min"> 12° </span>
            </div>    
      </div>
  `;
  });

  sixDaysForecastHTML = sixDaysForecastHTML + `</div>`;
  sixDaysForecastElement.innerHTML = sixDaysForecastHTML;
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", showFahrenheitTemp);

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", showCelsiusTemp);

searchCity("Amsterdam");
displaySixDaysForecast();
