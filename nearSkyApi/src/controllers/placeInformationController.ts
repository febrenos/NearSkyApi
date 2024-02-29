// controllers/MeuController.js
import { Request, Response } from "express";
const DayService = require('../services/placeInformationService');

async function getDay(req: Request, res: Response): Promise<void> {
    try {
        // Aqui você pode processar o request, por exemplo, pegar o lugar do corpo do request
        const { place } = req.body;

        // Chame o serviço para obter o dia da semana
        const dayOfWeek = await DayService.getDayOfWeek(place);

        // Envie a resposta com o dia da semana
        res.status(200).json({ "day-of-week": dayOfWeek });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    getDay
};
