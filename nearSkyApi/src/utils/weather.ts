import { WeatherType } from "../models/weatherModel";

export const mapWeatherToType = (weatherDescription: string): WeatherType => {
    if (typeof weatherDescription !== 'string') {
      console.error('Weather description is not a string:', weatherDescription);
      return WeatherType.Unvailable; // Ou qualquer valor padrão apropriado
    }
    switch (weatherDescription.toLowerCase()) {
      case 'clear sky':
      case 'clear':
      case 'sunny':
      case 'clear-day':
        return WeatherType.ClearDay;
      case 'clearNight':
        return WeatherType.ClearNight;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
      case 'cloudy':
        return WeatherType.Cloudy;
      case 'partly-cloudy-day':
        return WeatherType.PartlyCloudyDay;
      case 'partly-cloudy-night':
        return WeatherType.PartlyCloudyNight;
      case 'wind':
        return WeatherType.Wind;
      case 'shower rain':
      case 'Freezing Rain':
      case 'Sleet':
      case 'Light Shower Sleet':
      case 'Shower Sleet':
        return WeatherType.SleetRain;
      case 'rain':
      case 'light rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'showers-day':
      case 'showers-night':
      case 'showers-day':
        return WeatherType.Rainy;
      case 'thunderstorm':
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
      case 'thunder-rain':
        return WeatherType.Storm;
      case 'snow':
      case 'light snow':
      case 'heavy snow':
      case 'snow-showers-day':
      case 'snow-showers-night':
        return WeatherType.Snow;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'sand':
      case 'dust':
      case 'fog':
        return WeatherType.Foggy;
      case 'Light Rain and Snow':
      case 'Rain and Snow':
        WeatherType.RainyMix
      default:
        return WeatherType.Unvailable;
    }
  };

export const getMostFrequentValue = (forecastWeather: string[]): string => {
    const weatherCount: { [key: string]: number } = {};
    let maxCount = 0;
    let mostFrequentWeather = '';
  
    forecastWeather.forEach((weather: string) => {
      weatherCount[weather] = (weatherCount[weather] || 0) + 1;
      if (weatherCount[weather] > maxCount) {
        maxCount = weatherCount[weather];
        mostFrequentWeather = weather;
      }
    });
  
    return mostFrequentWeather;
  };