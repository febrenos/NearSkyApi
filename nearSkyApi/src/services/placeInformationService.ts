const OpenWeatherMapService = require('./OpenWeatherMapService');

async function getDayOfWeek(place:string) {
    // Aqui você pode usar a lógica para obter as coordenadas do lugar e, em seguida, obter o dia da semana
    // Este é um exemplo simplificado, você precisa implementar a lógica completa
    const coordinates = await OpenWeatherMapService.obterCoordenadas(place);
    const timeLocation = await OpenWeatherMapService.obterDataHoraLocal(coordinates.latitude, coordinates.longitude);
    const dayOfWeek = timeLocation.dayOfWeek; // Supondo que o serviço retorne o dia da semana

    return dayOfWeek;
}

module.exports = {
    getDayOfWeek
};
