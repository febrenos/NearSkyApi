"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBodyDefault = void 0;
exports.requestBodyDefault = {
    places: [],
    currentDate: `${new Date().toString()}`,
    forecastNextDays: 5,
    language: 'pt',
    unitGroup: 'metric',
    startDate: '', //${new Date().toISOString().slice(0, 10)} //toLocaleDateString()
    endDate: '',
    isRoundedNumbers: false,
};
