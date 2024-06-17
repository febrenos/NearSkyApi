"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundNumber = exports.removeDecimalPlaces = void 0;
function removeDecimalPlaces(number) {
    return Math.floor(number);
}
exports.removeDecimalPlaces = removeDecimalPlaces;
function roundNumber(number, isRoundedNumbers = false) {
    if (isRoundedNumbers) {
        return Math.round(number);
    }
    return number;
}
exports.roundNumber = roundNumber;
