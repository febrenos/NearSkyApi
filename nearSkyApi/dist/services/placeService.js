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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCitiesByName = void 0;
const axios_1 = __importDefault(require("axios"));
// http://api.geonames.org/searchJSON?q=sao+paulo%20sp&maxRows=10&username=fe.brenos
const getCitiesByName = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 5; // Limitando a 5 resultados
        const response = yield axios_1.default.get(`http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=fe.brenos`);
        // const cities = response.data.geonames.map((item: any) => ({ placeName: item.name })).slice(0, limit);
        const citiesSet = new Set();
        const cities = [];
        response.data.geonames.forEach((item) => {
            if (!citiesSet.has(item.name)) {
                citiesSet.add(item.name);
                cities.push({
                    placeName: item.name,
                    latLong: `${item.lat},${item.lng}`
                });
            }
        });
        //limit of values
        return cities.slice(0, limit);
    }
    catch (error) {
        throw error;
    }
});
exports.getCitiesByName = getCitiesByName;
