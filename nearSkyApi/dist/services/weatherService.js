"use strict";
// exampleService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWeather = exports.createWeather = void 0;
const weatherRepository_1 = require("../repositories/weatherRepository");
const createWeather = (id, message) => {
    const example = { id, message };
    return (0, weatherRepository_1.saveWeather)(example);
};
exports.createWeather = createWeather;
const getAllWeather = (states) => (0, weatherRepository_1.getWeatherByStates)(states);
exports.getAllWeather = getAllWeather;
