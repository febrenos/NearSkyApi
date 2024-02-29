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
const DayService = require('../services/placeInformationService');
function getDay(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Aqui você pode processar o request, por exemplo, pegar o lugar do corpo do request
            const { place } = req.body;
            // Chame o serviço para obter o dia da semana
            const dayOfWeek = yield DayService.getDayOfWeek(place);
            // Envie a resposta com o dia da semana
            res.status(200).json({ "day-of-week": dayOfWeek });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    });
}
module.exports = {
    getDay
};
