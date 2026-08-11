const API_KEY = "2e971ce6dda73b5e82843c6f2db8d2be";

const DEFAULT_CITY = "Jerusalem";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");


async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (data.cod !== "200") {
            alert("City not found");
            return;
        }

        const currentWeather = data.list[0];

        cityName.textContent = data.city.name;

        temperature.textContent =
            `${currentWeather.main.temp}°C`;

        feelsLike.textContent =
            `${currentWeather.main.feels_like}°C`;

        humidity.textContent =
            `${currentWeather.main.humidity}%`;

        const windSpeed = currentWeather.wind.speed * 3.6;
        wind.textContent = `${windSpeed.toFixed(1)} km/h`;

        const days = {};


        data.list.forEach(function(item) {

            const date = item.dt_txt.split(" ")[0];

            if (!days[date]) {
                days[date] = item;
            }

        });


        const forecastDays = Object.values(days);

        forecastDays.slice(0, 5).forEach(function(item, index) {
  

            const date = new Date(item.dt_txt);

            const dayName = date.toLocaleDateString("en-US", {
                weekday: "long"
            });


            document.getElementById(`day${index + 1}`)
                .textContent = dayName;


            document.getElementById(`temp${index + 1}`)
                .textContent = `${item.main.temp}°C`;


            document.getElementById(`desc${index + 1}`)
                .textContent = item.weather[0].description;

        });

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong. Please try again.");

    }

}

getWeather(DEFAULT_CITY);
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }

});