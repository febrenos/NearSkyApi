interface WeatherData {
    date: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  }
  
  export interface Place {
    placeName: string;
    latLong: string;
  }
  
export interface WeatherByCitiesVisualCrossingRequestBody {
    places: Place[];
    unitGroup?: string;//us metric uk
    language?: string;
    currentDate: string;//Fri Apr 12 2024 08:46:20 GMT-0300 (Brasilia Standard Time)
    forecastNextDays: number;
    startDate?:string;//2024-03-23
    endDate?:string;//2024-03-23
    isRoundedNumbers?: boolean;
}

export const requestBodyDefault: WeatherByCitiesVisualCrossingRequestBody = {
    places: [],
    currentDate: `${new Date().toString()}`,
    forecastNextDays: 5,
    language: 'pt',
    unitGroup: 'metric',
    startDate: '',//${new Date().toISOString().slice(0, 10)} //toLocaleDateString()
    endDate: '',
    isRoundedNumbers: false,
  };