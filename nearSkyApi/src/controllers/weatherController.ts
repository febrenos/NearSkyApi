import { Request, Response } from "express";
import { getAllWeather } from "../services/weatherDataService";

export const getWeathers = (req: Request, res: Response): void => {
  const { states } = req.body;

  if (!states || !Array.isArray(states)) {
    res.status(400).json({ error: "A lista de estados é obrigatória e deve ser um array." });
    return;
  }
  try {
    // Chamamos o serviço para obter os dados meteorológicos para os estados fornecidos
    const dayOfWeek = getDayOfWeek("São Paulo, Brasil"); // Exemplo de lugar fixo, você pode passar o lugar desejado
    const weatherData = getAllWeather(states);

    // Retornamos os dados meteorológicos na resposta
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
