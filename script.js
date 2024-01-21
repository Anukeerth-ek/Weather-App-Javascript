const apiKey = `fb236d1ccf2fc2c49dd2317ef20f626f`;

async function fetchWeatherData(city) {
    console.log("from", city)
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

// fetchWeatherData();

function updateWeatherUI(data) {
    const currentDate = new Date().toJSON().slice(0, 10);
    date.textContent = currentDate;
    
    console.log("data", data)
    descriptionText.textContent = data.weather[0].main;
    
    cityElement.textContent = data.name;
    let result = `${Math.round(data.main.temp)}°`;
    let temperatureValue = result.slice(0, 2)
    temperature.textContent = `${temperatureValue}${'°'}`
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    console.log("visiblity", humidity.textContent)
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;



}
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}