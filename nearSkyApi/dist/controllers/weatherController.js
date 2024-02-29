"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeathers = void 0;
const weatherDataService_1 = require("../services/weatherDataService");
const getWeathers = (req, res) => {
    const { states } = req.body;
    if (!states || !Array.isArray(states)) {
        res.status(400).json({ error: "A lista de estados é obrigatória e deve ser um array." });
        return;
    }
    try {
        // Chamamos o serviço para obter os dados meteorológicos para os estados fornecidos
        const dayOfWeek = getDayOfWeek("São Paulo, Brasil"); // Exemplo de lugar fixo, você pode passar o lugar desejado
        const weatherData = (0, weatherDataService_1.getAllWeather)(states);
        // Retornamos os dados meteorológicos na resposta
        res.json(weatherData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
exports.getWeathers = getWeathers;
