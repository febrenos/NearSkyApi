"use strict";
// exampleRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByPlace = exports.saveWeather = void 0;
const weatherDataModel_1 = require("../models/weatherDataModel");
const weathers = [];
const saveWeather = (weather) => {
    weathers.push(weather);
    return weather;
};
exports.saveWeather = saveWeather;
const getWeatherByPlace = (place) => {
    const weatherData = {
        day: "Monday",
        date: 1,
        dateText: "",
        forecastWeather: weatherDataModel_1.WeatherType.CloudyMoon,
        actualWeather: weatherDataModel_1.WeatherType.CloudyMoon,
        actualTemperature: 25,
        rainChance: 10,
        temperatureData: [25, 26, 27, 28, 29],
        rainChanceData: [0, 5, 10, 15, 20],
        maxTemperature: 30,
        minTemperature: 20
    };
    return [weatherData];
};
exports.getWeatherByPlace = getWeatherByPlace;
