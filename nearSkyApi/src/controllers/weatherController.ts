import { Request, Response } from "express";
import { getWeatherByCitiesOpenWeatherMap, getWeatherByCitiesVisualCrossing } from "../services/weatherService";
import { Place, WeatherByCitiesVisualCrossingRequestBody, requestBodyDefault } from "../interfaces/web/request";

export const getWeathersOpenWeatherMapController = async (req: Request, res: Response): Promise<void> => {
  const { placeName } = req.body;

  if (!placeName || !Array.isArray(placeName)) {
    res.status(400).json({ error: "A lista de estados é obrigatória e deve ser um array." });
    return;
  }

  try {
    // Aguardamos todas as promessas serem resolvidas
    const weatherDataList = await getWeatherByCitiesOpenWeatherMap(placeName); 

    // Retornamos os dados meteorológicos na resposta
    res.json(weatherDataList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export const getWeatherVisualCrossingController = async (req: Request, res: Response): Promise<void> => {
  try {
      // Extrair o corpo da requisição (request body)
      const requestBody: WeatherByCitiesVisualCrossingRequestBody = req.body;

      // Adicionar valores padrão para itens ausentes no requestBody
      const mergedRequestBody = { ...requestBodyDefault, ...requestBody };

      // Chamar o serviço para obter os dados do clima
      const weatherData = await getWeatherByCitiesVisualCrossing(mergedRequestBody);

      // Retornar os dados do clima na resposta (response)
      res.status(200).json(weatherData);
  } catch (error) {
      // Lidar com erros
      console.error('Error:', error);
      res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

