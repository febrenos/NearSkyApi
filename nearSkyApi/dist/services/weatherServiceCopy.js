"use strict";
// import axios from 'axios';
// import {CityWeather, WeatherData, WeatherType} from '../models/weatherModel'
// import { roundNumber } from '../utils';
// const API_KEY_OPEN_WEATHER_MAP = '0cad9945fb3f366ef52ffff59a3022f2';
// const API_KEY_VISUAL_CROSSING = 'YPDP4YKZLF97RSSEBMC7Q3467';
// const currentDate = new Date();
// const startOfDay = new Date(currentDate);
// startOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia atual
// const startOfDayUnix = Math.floor(startOfDay.getTime() / 1000);
// const nextSevenDays = new Date(currentDate);
// nextSevenDays.setDate(currentDate.getDate() + 7); // more 7 days
// const endOfDay = new Date(nextSevenDays);
// endOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia seguinte ao sétimo dia
// const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000);
// const forecastWeatheRList: string[] = [];
// const actualWeatherList: string[] = [];
// //https://openweathermap.org/
// export const getWeatherByCitiesOpenWeatherMap = async (cities: string[]): Promise<CityWeather[]> => {
//   try {
//     console.log("Unix timestamp para o início do dia atual:", startOfDayUnix);
//     const cityPromises = cities.map(city =>
//       axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric&start=${startOfDayUnix}&cnt=40`)
//     );
//     console.log(`http://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric&start=${startOfDayUnix}&end=${endOfDayUnix}&cnt=40`)
//     const cityResponses = await Promise.all(cityPromises);
//     const placeInfoList: CityWeather[] = cityResponses.map((response, index) => {
//       const cityData = response.data;
//       const cityWeatherData: WeatherData[] = cityData.list.reduce((accumulator: WeatherData[], item: any, index: number, array: any[]) => {
//         const currentDate = new Date();
//         const previousDay = accumulator.length ? accumulator[accumulator.length - 1] : null;
//         const date = new Date(item.dt * 1000);
//         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         const dayOfWeek = daysOfWeek[date.getDay()];
//         if (!previousDay || dayOfWeek !== daysOfWeek[new Date(previousDay.date * 1000).getDay()]) {
//           accumulator.push({
//             day: index === 0 ? 'Today' : dayOfWeek,
//             date: item.dt,
//             dateText: item.dt_txt,
//             forecastWeather: mapWeatherToType(item.weather[0].description),
//             actualWeather: mapWeatherToType(item.weather[0].description),
//             actualTemperature: roundNumber(item.main.temp),
//             rainChance: roundNumber(item.pop * 100),
//             temperatureData: [roundNumber(item.main.temp)],
//             rainChanceData: [roundNumber(item.pop * 100)],
//             maxTemperature: roundNumber(item.main.temp_max),
//             minTemperature: roundNumber(item.main.temp_min)
//           });
//         } else {
//           accumulator[accumulator.length - 1].temperatureData.push(roundNumber(item.main.temp));
//           accumulator[accumulator.length - 1].rainChanceData.push(roundNumber(item.pop * 100));
//           accumulator[accumulator.length - 1].maxTemperature = roundNumber(Math.max(accumulator[accumulator.length - 1].maxTemperature, item.main.temp_max));
//           accumulator[accumulator.length - 1].minTemperature = roundNumber(Math.min(accumulator[accumulator.length - 1].minTemperature, item.main.temp_min));
//           if (index === array.length - 1) {
//             accumulator[accumulator.length - 1].rainChance = accumulator[accumulator.length - 1].rainChanceData.reduce((acc, val) => acc + val, 0) / accumulator[accumulator.length - 1].rainChanceData.length;
//           }
//         }
//         return accumulator;
//       }, []);
//       return {
//         placeName: cityData.city.name,
//         data: cityWeatherData
//       };
//     });
//     return placeInfoList;
//   } catch (error) {
//     console.error('Error to get OpenWeatherMap data:', error);
//     throw error;
//   }
// };
// function getDay(date:number, lang:string){
//     const day = new Date(date).toLocaleDateString([lang], { weekday: 'long' })
//     return day;
// }
