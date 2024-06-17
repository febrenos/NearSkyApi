import { Request, Response } from "express";
import { LanguageModelDictionary } from "../models";

export const getAvailableLanguagesController = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(LanguageModelDictionary);
    } catch (error) {
        console.error(error);
        throw error;
    }
};