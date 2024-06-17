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
exports.getWeatherVisualCrossingController = exports.getWeathersOpenWeatherMapController = void 0;
const weatherService_1 = require("../services/weatherService");
const request_1 = require("../interfaces/web/request");
const getWeathersOpenWeatherMapController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeName } = req.body;
    if (!placeName || !Array.isArray(placeName)) {
        res.status(400).json({ error: "A lista de estados é obrigatória e deve ser um array." });
        return;
    }
    try {
        // Aguardamos todas as promessas serem resolvidas
        const weatherDataList = yield (0, weatherService_1.getWeatherByCitiesOpenWeatherMap)(placeName);
        // Retornamos os dados meteorológicos na resposta
        res.json(weatherDataList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
});
exports.getWeathersOpenWeatherMapController = getWeathersOpenWeatherMapController;
const getWeatherVisualCrossingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrair o corpo da requisição (request body)
        const requestBody = req.body;
        // Adicionar valores padrão para itens ausentes no requestBody
        const mergedRequestBody = Object.assign(Object.assign({}, request_1.requestBodyDefault), requestBody);
        // Chamar o serviço para obter os dados do clima
        const weatherData = yield (0, weatherService_1.getWeatherByCitiesVisualCrossing)(mergedRequestBody);
        // Retornar os dados do clima na resposta (response)
        res.status(200).json(weatherData);
    }
    catch (error) {
        // Lidar com erros
        console.error('Error:', error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
});
exports.getWeatherVisualCrossingController = getWeatherVisualCrossingController;
