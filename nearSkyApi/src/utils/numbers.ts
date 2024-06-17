export function removeDecimalPlaces(number: number): number {
    return Math.floor(number);
}

export function roundNumber(number: number, isRoundedNumbers:boolean = false): number {
    if(isRoundedNumbers){
        return Math.round(number);
    }
    return number;
}