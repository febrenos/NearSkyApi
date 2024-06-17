"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostFrequentValue = exports.mapWeatherToType = void 0;
const weatherModel_1 = require("../models/weatherModel");
const mapWeatherToType = (weatherDescription) => {
    if (typeof weatherDescription !== 'string') {
        console.error('Weather description is not a string:', weatherDescription);
        return weatherModel_1.WeatherType.Unvailable; // Ou qualquer valor padrão apropriado
    }
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
        case 'clear':
        case 'sunny':
        case 'clear-day':
            return weatherModel_1.WeatherType.ClearDay;
        case 'clearNight':
            return weatherModel_1.WeatherType.ClearNight;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
        case 'overcast clouds':
        case 'cloudy':
            return weatherModel_1.WeatherType.Cloudy;
        case 'partly-cloudy-day':
            return weatherModel_1.WeatherType.PartlyCloudyDay;
        case 'partly-cloudy-night':
            return weatherModel_1.WeatherType.PartlyCloudyNight;
        case 'wind':
            return weatherModel_1.WeatherType.Wind;
        case 'shower rain':
        case 'Freezing Rain':
        case 'Sleet':
        case 'Light Shower Sleet':
        case 'Shower Sleet':
            return weatherModel_1.WeatherType.SleetRain;
        case 'rain':
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'showers-day':
        case 'showers-night':
        case 'showers-day':
            return weatherModel_1.WeatherType.Rainy;
        case 'thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'thunder-rain':
        case 'thunder-showers-day':
        case 'thunder-showers-night':
        case 'thunder-rain':
            return weatherModel_1.WeatherType.Storm;
        case 'snow':
        case 'light snow':
        case 'heavy snow':
        case 'snow-showers-day':
        case 'snow-showers-night':
            return weatherModel_1.WeatherType.Snow;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'sand':
        case 'dust':
        case 'fog':
            return weatherModel_1.WeatherType.Foggy;
        case 'Light Rain and Snow':
        case 'Rain and Snow':
            weatherModel_1.WeatherType.RainyMix;
        default:
            return weatherModel_1.WeatherType.Unvailable;
    }
};
exports.mapWeatherToType = mapWeatherToType;
const getMostFrequentValue = (forecastWeather) => {
    const weatherCount = {};
    let maxCount = 0;
    let mostFrequentWeather = '';
    forecastWeather.forEach((weather) => {
        weatherCount[weather] = (weatherCount[weather] || 0) + 1;
        if (weatherCount[weather] > maxCount) {
            maxCount = weatherCount[weather];
            mostFrequentWeather = weather;
        }
    });
    return mostFrequentWeather;
};
exports.getMostFrequentValue = getMostFrequentValue;
