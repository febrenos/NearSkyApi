"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByCitiesOpenWeatherMap = void 0;
// OpenWeatherMapService.ts
const axios_1 = __importDefault(require("axios"));
const weatherDataModel_1 = require("../models/weatherDataModel");
const utils_1 = require("../utils");
const API_KEY = '0cad9945fb3f366ef52ffff59a3022f2';
const currentDate = new Date();
const startOfDay = new Date(currentDate);
startOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia atual
const startOfDayUnix = Math.floor(startOfDay.getTime() / 1000);
const nextSevenDays = new Date(currentDate);
nextSevenDays.setDate(currentDate.getDate() + 7); // more 7 days
const endOfDay = new Date(nextSevenDays);
endOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia seguinte ao sétimo dia
const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000);
const forecastWeatheRList = [];
const actualWeatherList = [];
const getWeatherByCitiesOpenWeatherMap = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Unix timestamp para o início do dia atual:", startOfDayUnix);
        const cityPromises = cities.map(city => axios_1.default.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&start=${startOfDayUnix}&cnt=40`));
        // axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&start=${startOfDayUnix}&end=${endOfDayUnix}&cnt=40`)
        console.log(`http://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${API_KEY}&units=metric&start=${startOfDayUnix}&end=${endOfDayUnix}&cnt=40`);
        const cityResponses = yield Promise.all(cityPromises);
        const placeInfoList = cityResponses.map((response, index) => {
            const cityData = response.data;
            const cityWeatherData = cityData.list.reduce((accumulator, item, index, array) => {
                const currentDate = new Date();
                const previousDay = accumulator.length ? accumulator[accumulator.length - 1] : null;
                const date = new Date(item.dt * 1000);
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayOfWeek = daysOfWeek[date.getDay()];
                if (!previousDay || dayOfWeek !== daysOfWeek[new Date(previousDay.date * 1000).getDay()]) {
                    accumulator.push({
                        day: index === 0 ? 'Today' : dayOfWeek,
                        date: item.dt,
                        dateText: item.dt_txt,
                        forecastWeather: mapWeatherToType(item.weather[0].description),
                        actualWeather: mapWeatherToType(item.weather[0].description),
                        actualTemperature: (0, utils_1.removeDecimalPlaces)(item.main.temp),
                        rainChance: (0, utils_1.removeDecimalPlaces)(item.pop * 100),
                        temperatureData: [(0, utils_1.removeDecimalPlaces)(item.main.temp)],
                        rainChanceData: [(0, utils_1.removeDecimalPlaces)(item.pop * 100)],
                        maxTemperature: (0, utils_1.removeDecimalPlaces)(item.main.temp_max),
                        minTemperature: (0, utils_1.removeDecimalPlaces)(item.main.temp_min)
                    });
                }
                else {
                    accumulator[accumulator.length - 1].temperatureData.push((0, utils_1.removeDecimalPlaces)(item.main.temp));
                    accumulator[accumulator.length - 1].rainChanceData.push((0, utils_1.removeDecimalPlaces)(item.pop * 100));
                    accumulator[accumulator.length - 1].maxTemperature = (0, utils_1.removeDecimalPlaces)(Math.max(accumulator[accumulator.length - 1].maxTemperature, item.main.temp_max));
                    accumulator[accumulator.length - 1].minTemperature = (0, utils_1.removeDecimalPlaces)(Math.min(accumulator[accumulator.length - 1].minTemperature, item.main.temp_min));
                    if (index === array.length - 1) {
                        accumulator[accumulator.length - 1].rainChance = accumulator[accumulator.length - 1].rainChanceData.reduce((acc, val) => acc + val, 0) / accumulator[accumulator.length - 1].rainChanceData.length;
                    }
                }
                return accumulator;
            }, []);
            return {
                placeName: cityData.city.name,
                data: cityWeatherData
            };
        });
        return placeInfoList;
    }
    catch (error) {
        console.error('Error to get OpenWeatherMap data:', error);
        throw error;
    }
});
exports.getWeatherByCitiesOpenWeatherMap = getWeatherByCitiesOpenWeatherMap;
const getMostFrequentValue = (forecastWeather) => {
    const weatherCount = {};
    let maxCount = 0;
    let mostFrequentWeather = '';
    forecastWeather.forEach((weather) => {
        weatherCount[weather] = (weatherCount[weather] || 0) + 1;
        if (weatherCount[weather] > maxCount) {
            maxCount = weatherCount[weather];
            mostFrequentWeather = weather;
        }
    });
    return mostFrequentWeather;
};
const mapWeatherToType = (weatherDescription) => {
    if (typeof weatherDescription !== 'string') {
        console.error('Weather description is not a string:', weatherDescription);
        return weatherDataModel_1.WeatherType.Unvailable; // Ou qualquer valor padrão apropriado
    }
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
        case 'clear':
        case 'sunny':
            return weatherDataModel_1.WeatherType.Sunny;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return weatherDataModel_1.WeatherType.CloudySun;
        case 'overcast clouds':
            return weatherDataModel_1.WeatherType.CloudyMoon;
        case 'shower rain':
        case 'Freezing Rain':
        case 'Sleet':
        case 'Light Shower Sleet':
        case 'Shower Sleet':
            return weatherDataModel_1.WeatherType.SleetRain;
        case 'rain':
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
            return weatherDataModel_1.WeatherType.Rainy;
        case 'thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
            return weatherDataModel_1.WeatherType.Storm;
        case 'snow':
        case 'light snow':
        case 'heavy snow':
            return weatherDataModel_1.WeatherType.Snow;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'sand':
        case 'dust':
        case 'fog':
            return weatherDataModel_1.WeatherType.Foggy;
        case 'Light Rain and Snow':
        case 'Rain and Snow':
            weatherDataModel_1.WeatherType.RainyMix;
        default:
            return weatherDataModel_1.WeatherType.Sunny;
    }
};
// actualWeather e forecastWeather pegar 12:00
// item.pop é deletado após 24h?
// ajustar actualWeather
// limiar casas decimais
// https://openweathermap.org/weather-conditions#How-to-get-icon-URL
// https://openweathermap.org/api/one-call-3
// https://api.openweathermap.org/data/2.5/forecast?q=sao paulo, rio de janeiro &appid=0cad9945fb3f366ef52ffff59a3022f2&units=metric&start=1646121600&end=1646793599&cnt=56
