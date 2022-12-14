function displayWeatherCondition(response) {
  console.log(response.data);
  
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



// link example
//`https://api.openweathermap.org/data/2.5/weather?q=London&appid=3fdc8cfbf2d6fa0116c9ae92d3df4f79&units=metric`;

//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
