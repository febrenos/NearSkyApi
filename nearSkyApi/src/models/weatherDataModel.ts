export interface PlaceInfo {
  placeKey: string;
  placeName: string;
  data: WeatherData[];
}

export interface WeatherData {
  day: string;
  dt_txt: string;
  forecastWeather: WeatherType;
  actualWeather?: WeatherType;
  actualTemperature: number;
  rainChance: number;
  temperatureData: number[];
  precipitationData: number[];
  maxTemperature: number;
  minTemperature: number;
}

export enum WeatherType {
  Sunny = 'sunny',
  CloudySun = 'cloudySun',
  Moony = 'moony',
  CloudyMoon = 'cloudyMoon',
  Rainy = 'rainy',
  SleetRain = 'sleetRain',
  Foggy = 'foggy',
  Snow = 'snow',
  RainyMix = 'rainyMix',
  Storm = 'storm'
}