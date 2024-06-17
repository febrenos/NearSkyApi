// exampleRoutes.ts

import express from "express";
import { getPlacesController } from "../controllers/placeController";
import { 
        getWeathersOpenWeatherMapController,
        getWeatherVisualCrossingController, 
        getAvailableLanguagesController
} from "../controllers";

const router = express.Router();

router.post("/place", getPlacesController);
router.post("/weather/open-weather-map", getWeathersOpenWeatherMapController);
router.post("/weather/visual-crossing", getWeatherVisualCrossingController);
router.get("/available-languages", getAvailableLanguagesController);

export default router;
