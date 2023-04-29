let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let date = days[now.getDay()];
currentDate.innerHTML = `${date}`;

let hours = now.getHours();
let minutes = now.getMinutes();
let currentTime = document.querySelector("#current-time");
if (hours <= 12) {
  currentTime.innerHTML = `${hours}:${minutes} AM`;
} else {
  currentTime.innerHTML = `${hours}:${minutes} PM`;
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let changedTemp = Math.round(response.data.main.temp);
  let changedmaxTemp = Math.round(response.data.main.temp_max);
  let changedminTemp = Math.round(response.data.main.temp_min);
  let changedemojidesc = response.data.weather[0].description;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${changedTemp}`;
  let maxtemp = document.querySelector("#max-temp");
  maxtemp.innerHTML = `${changedmaxTemp}`;
  let mintemp = document.querySelector("#min-temp");
  mintemp.innerHTML = `${changedminTemp}`;
  let emojidesc = document.querySelector("#emoji-desc");
  emojidesc.innerHTML = `${changedemojidesc}`;
}

function showall(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityInput");
  let cityChange = document.querySelector("#city");
  cityChange.innerHTML = `${inputCity.value}`;

  let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", showall);

let searchCurrent = document.querySelector("#current-button");
searchCurrent.addEventListener("click", getCurrentLocation);

// function CToF(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temperature");
//   temp.innerHTML = 95;
// }

// function FToC(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temperature");
//   temp.innerHTML = 35;
// }

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", CToF);

// let celcius = document.querySelector("#celcius");
// celcius.addEventListener("click", FToC);
