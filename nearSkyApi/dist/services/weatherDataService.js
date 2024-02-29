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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWeather = exports.createWeather = void 0;
const weatherDataRepository_1 = require("../repositories/weatherDataRepository");
const OpenWeatherMapService = require('./OpenWeatherMapService');
const createWeather = (places) => __awaiter(void 0, void 0, void 0, function* () {
    const allWeatherData = [];
    for (const place of places) {
        const weatherData = yield (0, weatherDataRepository_1.getWeatherByPlace)(place);
        const placeInfo = {
            placeKey: place,
            placeName: getPlaceName(place),
            data: weatherData
        };
        allWeatherData.push(placeInfo);
    }
    return allWeatherData;
});
exports.createWeather = createWeather;
const getAllWeather = (places) => __awaiter(void 0, void 0, void 0, function* () {
    const allWeatherData = [];
    for (const place of places) {
        const weatherData = yield (0, weatherDataRepository_1.getWeatherByPlace)(place);
        const placeInfo = {
            placeKey: place,
            placeName: getPlaceName(place),
            data: weatherData
        };
        allWeatherData.push(placeInfo);
    }
    return allWeatherData;
});
exports.getAllWeather = getAllWeather;
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
