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
exports.getWeatherByCitiesVisualCrossing = exports.getWeatherByCitiesOpenWeatherMap = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const API_KEY_OPEN_WEATHER_MAP = '0cad9945fb3f366ef52ffff59a3022f2';
const API_KEY_VISUAL_CROSSING = 'YPDP4YKZLF97RSSEBMC7Q3467';
//https://openweathermap.org/
const getWeatherByCitiesOpenWeatherMap = (cities) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia atual
    const startOfDayUnix = Math.floor(startOfDay.getTime() / 1000);
    const nextSevenDays = new Date(currentDate);
    nextSevenDays.setDate(currentDate.getDate() + 7); // more 7 days
    const endOfDay = new Date(nextSevenDays);
    endOfDay.setHours(0, 0, 0, 0); // Definindo para 00:00:00 do dia seguinte ao sétimo dia
    const endOfDayUnix = Math.floor(endOfDay.getTime() / 1000);
    try {
        console.log("Unix timestamp para o início do dia atual:", startOfDayUnix);
        const cityPromises = cities.map(city => axios_1.default.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric&start=${startOfDayUnix}&cnt=40`));
        console.log(`http://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${API_KEY_OPEN_WEATHER_MAP}&units=metric&start=${startOfDayUnix}&end=${endOfDayUnix}&cnt=40`);
        const cityResponses = yield Promise.all(cityPromises);
        const placeInfoList = cityResponses.map((response, index) => {
            const cityData = response.data;
            const cityWeatherData = cityData.list.reduce((accumulator, item, index, array) => {
                const currentDate = new Date();
                const previousDay = accumulator.length ? accumulator[accumulator.length - 1] : null;
                const date = new Date(item.dt * 1000);
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayOfWeek = daysOfWeek[date.getDay()];
                if (!previousDay || new Date(item.dt_txt * 1000).getDate() !== date.getDate()) {
                    accumulator.push({
                        day: dayOfWeek,
                        datetimeEpoch: item.dt,
                        datetime: item.dt_txt,
                        forecastWeather: (0, utils_1.mapWeatherToType)(item.weather[0].description),
                        actualWeather: (0, utils_1.mapWeatherToType)(item.weather[0].description),
                        translateForecastWeather: item.conditions,
                        translateActualWeather: item.conditions,
                        temperature: (0, utils_1.roundNumber)(item.main.temp),
                        rainChance: (0, utils_1.roundNumber)(item.pop * 100),
                        temperatureData: [(0, utils_1.roundNumber)(item.main.temp)],
                        rainChanceData: [(0, utils_1.roundNumber)(item.pop * 100)],
                        maxTemperature: (0, utils_1.roundNumber)(item.main.temp_max),
                        minTemperature: (0, utils_1.roundNumber)(item.main.temp_min),
                        forecastDescription: '',
                        actualDescription: ''
                    });
                }
                else {
                    accumulator[accumulator.length - 1].temperatureData.push((0, utils_1.roundNumber)(item.main.temp));
                    accumulator[accumulator.length - 1].rainChanceData.push((0, utils_1.roundNumber)(item.pop * 100));
                    accumulator[accumulator.length - 1].maxTemperature = (0, utils_1.roundNumber)(Math.max(accumulator[accumulator.length - 1].maxTemperature, item.main.temp_max));
                    accumulator[accumulator.length - 1].minTemperature = (0, utils_1.roundNumber)(Math.min(accumulator[accumulator.length - 1].minTemperature, item.main.temp_min));
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
//https://www.visualcrossing.com/
const getWeatherByCitiesVisualCrossing = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const startEndDate = (0, utils_1.getStartEndDate)(requestBody.currentDate, requestBody.forecastNextDays, requestBody.startDate, requestBody.endDate);
    try {
        // Fetch weather data for each city
        const cityPromises = requestBody.places.map(place => {
            const { latLong } = place; // Desestruturação
            console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latLong}/${startEndDate[0]}/${startEndDate[1]}?unitGroup=${requestBody.unitGroup}&key=${API_KEY_VISUAL_CROSSING}&contentType=json&lang=${requestBody.language}`);
            return axios_1.default.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latLong}/${startEndDate[0]}/${startEndDate[1]}?unitGroup=${requestBody.unitGroup}&key=${API_KEY_VISUAL_CROSSING}&contentType=json&lang=${requestBody.language}`);
        });
        //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-23.536,-46.5754/2024-04-13/2024-04-28?unitGroup=metric&key=YPDP4YKZLF97RSSEBMC7Q3467&contentType=json
        //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-23.536,-46.5754/2024-04-13/2024-04-28?unitGroup=metric&key=YPDP4YKZLF97RSSEBMC7Q3467&contentType=json
        //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sao%20paulo?unitGroup=metric&key=YPDP4YKZLF97RSSEBMC7Q3467&contentType=json&language=pt-br
        const cityResponses = yield Promise.all(cityPromises);
        // Process weather data for each city
        const placeInfoList = cityResponses.map((response, index) => {
            const cityData = response.data;
            const cityWeatherData = cityData.days.reduce((accumulator, day) => {
                let previousDay = day.datetime;
                if (!previousDay || previousDay !== previousDay.date) {
                    // console.log(`${getDayOfWeek(requestBody.currentDate, day.datetime, requestBody.language)}: ${day.datetime}`)
                    const weatherData = {
                        day: (0, utils_1.getDayOfWeek)(requestBody.currentDate, day.datetimeEpoch, requestBody.language),
                        datetimeEpoch: day.datetimeEpoch,
                        datetime: day.datetime,
                        forecastWeather: (0, utils_1.mapWeatherToType)(day.icon),
                        translateForecastWeather: day.conditions,
                        temperature: day.temp,
                        rainChance: (0, utils_1.roundNumber)(day.precipprob, requestBody.isRoundedNumbers),
                        temperatureData: [],
                        rainChanceData: [],
                        maxTemperature: (0, utils_1.roundNumber)(day.tempmax, requestBody.isRoundedNumbers),
                        minTemperature: (0, utils_1.roundNumber)(day.tempmin, requestBody.isRoundedNumbers),
                        forecastDescription: day.description,
                    };
                    previousDay = day.datetime;
                    // console.log(`${!startDate} || ${day.datetime} === ${formatDate(currentDate)}`)
                    // console.log(`${convertEpochToISO8601(day.datetimeEpoch, false)} === ${convertEpochToISO8601(new Date(requestBody.currentDate).getTime() / 1000, true)}`)
                    if ((0, utils_1.convertEpochToISO8601)(day.datetimeEpoch, false) === (0, utils_1.convertEpochToISO8601)(new Date(requestBody.currentDate).getTime() / 1000, true)) { //!requestBody.startDate
                        weatherData.actualWeather = (0, utils_1.mapWeatherToType)(day.icon);
                        weatherData.translateActualWeather = day.conditions;
                        weatherData.actualDescription = day.description;
                    }
                    accumulator.push(weatherData);
                }
                let lastDate; // undefined
                if (day.hours) {
                    for (let i = 0; i < day.hours.length; i++) {
                        const hour = day.hours[i];
                        const currentDateEpochTime = Math.floor(new Date(requestBody.currentDate).getTime() / 1000);
                        // if (Math.abs(currentDateEpochTime - hour.datetimeEpoch) < Math.abs(currentDateEpochTime - lastDate)) {
                        // if (convertEpochToISO8601(day.hours[i].datetimeEpoch, false) === convertEpochToISO8601(new Date(requestBody.currentDate).getTime() / 1000, true)) {
                        console.log(`${(0, utils_1.convertEpochToISO8601)(day.hours[i].datetimeEpoch, false)} === ${(0, utils_1.convertEpochToISO8601)(new Date(requestBody.currentDate).getTime() / 1000, true)} ${(0, utils_1.convertEpochToISO8601)(day.hours[i].datetimeEpoch, false) === (0, utils_1.convertEpochToISO8601)(new Date(requestBody.currentDate).getTime() / 1000, true)}`);
                        if ((0, utils_1.convertEpochToISO8601)(day.hours[i].datetimeEpoch, false) === (0, utils_1.convertEpochToISO8601)(new Date(requestBody.currentDate).getTime() / 1000, true)) { // Math.abs() make positive value
                            // Verifica se a hora atual está mais próxima do que a última hora processada
                            accumulator[accumulator.length - 1].actualWeather = (0, utils_1.mapWeatherToType)(hour.icon);
                            accumulator[accumulator.length - 1].actualDescription = hour.description;
                            accumulator[accumulator.length - 1].temperature = (0, utils_1.roundNumber)(hour.temp, requestBody.isRoundedNumbers);
                            lastDate = hour.datetimeEpoch;
                        }
                        //interval in 3 itens i+1 (because start in 0)
                        // console.log(`${(i)} % 3 === 0) ${(i % 3 === 0)}`)
                        if ((i % 3 === 0)) {
                            accumulator[accumulator.length - 1].temperatureData.push((0, utils_1.roundNumber)(hour.temp, requestBody.isRoundedNumbers));
                            accumulator[accumulator.length - 1].rainChanceData.push((0, utils_1.roundNumber)(hour.precipprob, requestBody.isRoundedNumbers));
                        }
                    }
                }
                return accumulator;
            }, []);
            const cityName = requestBody.places[index].placeName;
            return {
                placeName: cityName,
                description: cityData.description,
                data: cityWeatherData
            };
        });
        return placeInfoList;
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
});
exports.getWeatherByCitiesVisualCrossing = getWeatherByCitiesVisualCrossing;
// testar actualWeather
