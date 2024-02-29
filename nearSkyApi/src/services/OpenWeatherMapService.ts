// OpenWeatherMapService.ts
import axios from 'axios';
import {WeatherData, WeatherType} from '../models/weatherDataModel'

const API_KEY = '0cad9945fb3f366ef52ffff59a3022f2';
const currentDate = new Date();
const nextSevenDays = new Date(currentDate);
nextSevenDays.setDate(currentDate.getDate() + 7); // more 7 days

const unixTimestampCurrent = Math.floor(currentDate.getTime() / 1000);
const unixTimestampNextSevenDays = Math.floor(nextSevenDays.getTime() / 1000);

export const getWeatherByCity = async (city: string): Promise<WeatherData[]> => {

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&start=${unixTimestampCurrent}&end=${unixTimestampNextSevenDays}&cnt=40`);

    const weatherDataList: WeatherData[] = response.data.list.reduce((accumulator: WeatherData[], item: any) => {
      const previousDay = accumulator.length ? accumulator[accumulator.length - 1] : null;

      // convert to dt_txt to dayOfWeek
      const date = new Date(item.dt * 1000);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[date.getDay()];

      const currentTime = Date.now();

      if (!previousDay || new Date(previousDay.day).getDate() !== new Date(item.dt_txt).getDate()) {
        if (previousDay) {
          const forecastWeatherValue = getMostFrequentWeather(item.weather[0].description);
        }
        
        accumulator.push({
          day: dayOfWeek,
          dt_txt: item.dt_txt,
          forecastWeather: mapWeatherToType(item.weather[0].description),
          actualWeather: mapWeatherToType(item.weather[0].description),
          actualTemperature: item.main.temp,
          rainChance: item.pop,
          temperatureData: [item.main.temp],
          precipitationData: [item.pop],
          maxTemperature: item.main.temp_max,
          minTemperature: item.main.temp_min
        });
      } else {
        previousDay.temperatureData.push(item.main.temp);
        previousDay.precipitationData.push(item.pop);
        previousDay.maxTemperature = Math.max(previousDay.maxTemperature, item.main.temp_max);
        previousDay.minTemperature = Math.min(previousDay.minTemperature, item.main.temp_min);
      }

      if (previousDay && new Date(previousDay.day).getDate() !== new Date(item.dt_txt).getDate()) {
        previousDay.rainChance = previousDay.precipitationData.reduce((sum, precipitation) => sum + precipitation, 0) / previousDay.precipitationData.length;

        previousDay.precipitationData = [];
      }

      return accumulator;
    }, []);

    return weatherDataList;
  } catch (error) {
    console.error('Error to get OpenWeatherMap data:', error);
    throw error;
  }
};

const getMostFrequentWeather = (forecastWeather: string[]): string => {
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

const mapWeatherToType = (weatherDescription: string): WeatherType => {
  switch (weatherDescription.toLowerCase()) {
    case 'clear sky':
    case 'clear':
    case 'sunny':
      return WeatherType.Sunny;
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      return WeatherType.CloudySun;
    case 'overcast clouds':
      return WeatherType.CloudyMoon;
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
      return WeatherType.Rainy;
    case 'thunderstorm':
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
      return WeatherType.Storm;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
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
      return WeatherType.Sunny;
  }
};

// actualWeather e forecastWeather pegar 12:00
// item.pop é deletado após 24h?