// exampleRepository.ts

import { WeatherData, WeatherType } from "../models/weatherDataModel";

const weathers: WeatherData[] = [];

export const saveWeather = (weather: WeatherData): WeatherData => {
  weathers.push(weather);
  return weather;
};

export const getWeatherByPlace = (place: string): WeatherData[] => {

  const weatherData: WeatherData = {
    day: "Monday",
    dt_txt: "",
    forecastWeather: WeatherType.CloudyMoon,
    actualWeather: WeatherType.CloudyMoon,
    actualTemperature: 25,
    rainChance: 10,
    temperatureData: [25, 26, 27, 28, 29],
    precipitationData: [0, 5, 10, 15, 20],
    maxTemperature: 30,
    minTemperature: 20
  };

  return [weatherData];
};