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
const OpenWeatherMapService = require('./OpenWeatherMapService');
function getDayOfWeek(place) {
    return __awaiter(this, void 0, void 0, function* () {
        // Aqui você pode usar a lógica para obter as coordenadas do lugar e, em seguida, obter o dia da semana
        // Este é um exemplo simplificado, você precisa implementar a lógica completa
        const coordinates = yield OpenWeatherMapService.obterCoordenadas(place);
        const timeLocation = yield OpenWeatherMapService.obterDataHoraLocal(coordinates.latitude, coordinates.longitude);
        const dayOfWeek = timeLocation.dayOfWeek; // Supondo que o serviço retorne o dia da semana
        return dayOfWeek;
    });
}
module.exports = {
    getDayOfWeek
};
