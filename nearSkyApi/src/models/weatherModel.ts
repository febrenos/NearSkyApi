export interface CityWeather {
  placeName: string;
  description?: string; 
  data: WeatherData[];
}

export interface WeatherData {
  day: string;
  datetimeEpoch: number;
  datetime: string;
  forecastWeather: WeatherType;
  actualWeather?: WeatherType;
  translateForecastWeather: string;
  translateActualWeather?: string;
  temperature: number;
  rainChance: number;
  temperatureData: number[];
  rainChanceData: number[];
  maxTemperature: number;
  minTemperature: number;
  forecastDescription: string;
  actualDescription?: string;
}

export enum WeatherType {
  ClearDay = 'clearDay',
  Cloudy = 'cloudy',
  PartlyCloudyDay = 'partlyCloudyDay',
  ClearNight = 'clearNight',
  PartlyCloudyNight = 'partlyCloudyNight',
  Wind = 'wind',
  Rainy = 'rainy',
  SleetRain = 'sleetRain',
  Foggy = 'foggy',
  Snow = 'snow',
  RainyMix = 'rainyMix',
  Storm = 'storm',
  Unvailable = 'Unvailable'
}