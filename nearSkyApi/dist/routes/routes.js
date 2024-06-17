"use strict";
// exampleRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeController_1 = require("../controllers/placeController");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post("/place", placeController_1.getPlacesController);
router.post("/weather/open-weather-map", controllers_1.getWeathersOpenWeatherMapController);
router.post("/weather/visual-crossing", controllers_1.getWeatherVisualCrossingController);
router.get("/available-languages", controllers_1.getAvailableLanguagesController);
exports.default = router;
