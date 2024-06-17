import { Request, Response } from "express";
import { getCitiesByName } from "../services/placeService";
import { PlaceNames } from "../models/placeModel";

export const getPlacesController = async (req: Request, res: Response): Promise<void> => {
    const { placeName } = req.body;

    if (!placeName || typeof placeName !== 'string') {
        res.status(400).json({ error: "O parâmetro 'place' é obrigatório e deve ser uma string." });
        return;
    }
    try {
        const cities: PlaceNames[] = await getCitiesByName(placeName);
        res.json(cities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
};
