function formatDate(someDate) {
  let date = someDate.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[someDate.getDay()];
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
  let month = months[someDate.getMonth()];
  let formattedDate = `${day}, ${date} ${month}`;
  return formattedDate;
}

let currentDate = document.querySelector("#date");
let nowDate = new Date();
currentDate.innerHTML = formatDate(nowDate);

function formatTime(someTime) {
  let hours = someTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = someTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

let currentTime = document.querySelector("#time");
let nowTime = new Date();
currentTime.innerHTML = formatTime(nowTime);

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let pressureElement = document.querySelector("#pressure");
  let humiidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
  humiidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;


 axios.get(apiUrl).then(displayWeatherCondition);


