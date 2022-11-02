//declaro la api key
const api_key = "3efc2b3823aaf74eccec6260a03c90cd";;

//declaro todas las variables del DOM
let temperatureValue = document.getElementById("temperature--value");
let temperatureHumidity = document.getElementById("temperature--humidity");
let temperatureDescription = document.getElementById("temperature--description");
let ubication = document.getElementById("ubication");
let windVelocity = document.getElementById("wind--velocity");
let icons = document.getElementById("icons");
let countryData = document.getElementById("countryData");


window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric&lang=es`;
      console.log(url);
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let temp = Math.round(data.main.temp);
          temperatureValue.textContent = `${temp} °C`;

          switch (data.weather[0].main) {
            
            case "Thunderstorm":
              icons.src = "imgs/thunder.svg";
              temperatureDescription.textContent = "TORMENTA";
              break;
            case "Drizzle":
              icons.src = "imgs/rainy-2.svg";
              temperatureDescription.textContent = "LLOVIZNA";
              break;
            case "Rain":
              icons.src = "imgs/rainy-7.svg";
              temperatureDescription.textContent = "LLUVIA";
              break;
            case "Snow":
              icons.src = "imgs/snowy-6.svg";
              temperatureDescription.textContent = "NIEVE";
              break;
            case "Clear":
              icons.src = "imgs/day.svg";
              temperatureDescription.textContent = "DESPEJADO";
              break;
            case "Atmosphere":
              icons.src = "imgs/weather.svg";
              temperatureDescription.textContent = "ATMOSFERA";
              break;
            case "Clouds":
              icons.src = "imgs/cloudy-day-1.svg";
              temperatureDescription.textContent = "NUBES";
              break;
            default:
              icons.src = "imgs/cloudy-day-1.svg";
              console.log("por defecto");
          }
          icons.style.display = "block";
          let humidity_value = Math.round(data.main.humidity);
          temperatureHumidity.textContent = `Humedad: ${humidity_value}%`;

          ubication.textContent = data.name;
          countryData.textContent = data.sys.country;

          windVelocity.textContent = `${data.wind.speed} m/s`;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});

document.getElementById("search").addEventListener("submit", search);

function search(e) {
  var name = document.getElementById("name").value;
  var country = document.getElementById("country").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name},${country}&appid=${api_key}&units=metric&lang=es`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temp = Math.round(data.main.temp);
      temperatureValue.textContent = `${temp} °C`;

      switch (data.weather[0].main) {
        case "Thunderstorm":
          icons.src = "imgs/thunder.svg";
          temperatureDescription.textContent = "TORMENTA";
          break;
        case "Drizzle":
          icons.src = "imgs/rainy-2.svg";
          temperatureDescription.textContent = "LLOVIZNA";
          break;
        case "Rain":
          icons.src = "imgs/rainy-7.svg";
          temperatureDescription.textContent = "LLUVIA";
          break;
        case "Snow":
          icons.src = "imgs/snowy-6.svg";
          temperatureDescription.textContent = "NIEVE";
          break;
        case "Clear":
          icons.src = "imgs/day.svg";
          temperatureDescription.textContent = "DESPEJADO";
          break;
        case "Atmosphere":
          icons.src = "imgs/weather.svg";
          temperatureDescription.textContent = "ATMOSFERA";
          break;
        case "Clouds":
          icons.src = "imgs/cloudy-day-1.svg";
          temperatureDescription.textContent = "NUBES";
          break;
        default:
          icons.src = "imgs/cloudy-day-1.svg";
          console.log("por defecto");
      }
      icons.style.display = "block";
      ubication.textContent = data.name;
      countryData.textContent = data.sys.country;
      windVelocity.textContent = `${data.wind.speed} m/s`;
    })
    .catch((error) => {
      console.log(error);
    });

  e.preventDefault();
}
