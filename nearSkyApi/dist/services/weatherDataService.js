"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WeatherService = require('./weatherService');
// export const createWeather = async (places: string[]): Promise<CityWeather[]> => {
//   const allWeatherData: CityWeather[] = [];
//   for (const place of places) {
//     const weatherData: WeatherData[] = await getWeatherByPlace(place);
//     const placeInfo: CityWeather = {
//       placeName: getPlaceName(place),
//       data: weatherData
//     };
//     allWeatherData.push(placeInfo);
//   }
//   return allWeatherData;
// };
// export const getAllWeather = async (places: string[]): Promise<CityWeather[]> => {
//   const allWeatherData: CityWeather[] = [];
//   for (const place of places) {
//     const weatherData: WeatherData[] = await getWeatherByPlace(place);
//     const placeInfo: CityWeather = {
//       placeName: getPlaceName(place),
//       data: weatherData
//     };
//     allWeatherData.push(placeInfo);
//   }
//   return allWeatherData;
// };
function getPlaceName(placeKey) {
    if (placeKey === "sp-br") {
        return "São Paulo";
    }
    else if (placeKey === "rj") {
        return "Rio de Janeiro";
    }
    else {
        return "Local Desconhecido";
    }
}
