"use strict";
// exampleRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByStates = exports.saveWeather = void 0;
const weathers = [];
const saveWeather = (weather) => {
    weathers.push(weather);
    return weather;
};
exports.saveWeather = saveWeather;
const getWeatherByStates = (states) => {
    return states;
};
exports.getWeatherByStates = getWeatherByStates;
