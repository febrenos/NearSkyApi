"use strict";
// exampleRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const router = express_1.default.Router();
router.post("/weather/open-weather-map", weatherController_1.getWeathersOpenWeatherMapController);
router.post("/weather/visual-crossing", weatherController_1.getWeatherVisualCrossingController);
exports.default = router;
