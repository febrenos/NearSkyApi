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
exports.getPlacesController = void 0;
const placeService_1 = require("../services/placeService");
const getPlacesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { placeName } = req.body;
    if (!placeName || typeof placeName !== 'string') {
        res.status(400).json({ error: "O parâmetro 'place' é obrigatório e deve ser uma string." });
        return;
    }
    try {
        const cities = yield (0, placeService_1.getCitiesByName)(placeName);
        res.json(cities);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
});
exports.getPlacesController = getPlacesController;
