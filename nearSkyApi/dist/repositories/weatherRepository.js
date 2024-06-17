"use strict";
// exampleRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWeather = void 0;
const weathers = [];
const saveWeather = (weather) => {
    weathers.push(weather);
    return weather;
};
exports.saveWeather = saveWeather;
// export const getWeatherByPlace = (place: string): WeatherData[] => {
//   const weatherData: WeatherData = {
//     day: "Monday",
//     date:1,
//     dateText: "",
//     forecastWeather: WeatherType.CloudyMoon,
//     actualWeather: WeatherType.CloudyMoon,
//     actualTemperature: 25,
//     rainChance: 10,
//     temperatureData: [25, 26, 27, 28, 29],
//     rainChanceData: [0, 5, 10, 15, 20],
//     maxTemperature: 30,
//     minTemperature: 20
//   };
//   return [weatherData];
// };
