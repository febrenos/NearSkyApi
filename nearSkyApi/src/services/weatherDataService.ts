import { PlaceInfo, WeatherData } from "../models/weatherDataModel";
import { saveWeather, getWeatherByPlace } from "../repositories/weatherDataRepository";
import { getWeatherByCity } from "./OpenWeatherMapService";

const OpenWeatherMapService = require('./OpenWeatherMapService');

export const createWeather = async (places: string[]): Promise<PlaceInfo[]> => {
  const allWeatherData: PlaceInfo[] = [];

  for (const place of places) {
    const weatherData: WeatherData[] = await getWeatherByPlace(place);
    const placeInfo: PlaceInfo = {
      placeKey: place,
      placeName: getPlaceName(place),
      data: weatherData
    };
    allWeatherData.push(placeInfo);
  }

  return allWeatherData;
};

export const getAllWeather = async (places: string[]): Promise<PlaceInfo[]> => {
  const allWeatherData: PlaceInfo[] = [];

  for (const place of places) {
    const weatherData: WeatherData[] = await getWeatherByPlace(place);

    const placeInfo: PlaceInfo = {
      placeKey: place,
      placeName: getPlaceName(place),
      data: weatherData
    };
    allWeatherData.push(placeInfo);
  }

  return allWeatherData;
};

function getPlaceName(placeKey: string): string {
  if (placeKey === "sp-br") {
    return "São Paulo";
  } else if (placeKey === "rj") {
    return "Rio de Janeiro";
  } else {
    return "Local Desconhecido";
  }
}
