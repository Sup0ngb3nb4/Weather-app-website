/*
1. Set variables to store API Key and API URL.
2. Create an async function to change HTML elements when searching for cities and updating the weather.
3. Create an event listener for the search button that takes place on "click" and takes input from the search box.
4. Update the weather image
*/

const apiKey = "68af5d36ba25ccf3c9c09db76aa10061";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".weather-app input");
const searchBtn = document.querySelector(".weather-app button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    else{
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none";
    }
    
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});