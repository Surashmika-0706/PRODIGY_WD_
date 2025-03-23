const url = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; // Replace with your API key if needed

$(document).ready(function () {
    // Fetch weather for default city or user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                weatherFnByCoords(lat, lon);
            },
            (error) => {
                console.error('Error getting location:', error);
                weatherFn('Pune'); // Fallback to default city
            }
        );
    } else {
        weatherFn('Pune'); // Fallback if geolocation is not supported
    }
});

async function weatherFn(cName) {
    $('#loading').show();
    $('#weather-info').hide();
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    const forecastTemp = `${forecastUrl}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            const forecastRes = await fetch(forecastTemp);
            const forecastData = await forecastRes.json();
            weatherShowFn(data);
            showForecast(forecastData);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    } finally {
        $('#loading').hide();
    }
}

async function weatherFnByCoords(lat, lon) {
    const temp = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastTemp = `${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            const forecastRes = await fetch(forecastTemp);
            const forecastData = await forecastRes.json();
            weatherShowFn(data);
            showForecast(forecastData);
        } else {
            alert('Unable to fetch weather data for your location.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#humidity').html(`${data.main.humidity}%`);
    $('#wind-speed').html(`${data.wind.speed} m/s`);
    $('#pressure').html(`${data.main.pressure} hPa`);
    $('#weather-icon').attr('src',
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').addClass('animate__fadeIn').fadeIn();
}

function showForecast(data) {
    const forecastList = $('#forecast-list');
    forecastList.empty();
    for (let i = 0; i < data.list.length; i += 8) { // Show one forecast per day
        const forecast = data.list[i];
        const date = moment(forecast.dt_txt).format('MMM D');
        const icon = forecast.weather[0].icon;
        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        forecastList.append(`
            <div class="forecast-item">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
                <p>${temp}°C</p>
                <p>${description}</p>
            </div>
        `);
    }
}