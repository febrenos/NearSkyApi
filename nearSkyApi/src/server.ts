// server.ts

import express from "express";
import routes from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});


//https://openweathermap.org/api/geocoding-api
//https://openweathermap.org/api/weather-map-2

//https://www.weatherapi.com/api.aspx
//https://docs.tomorrow.io/reference/weather-recent-history
// https://app.tomorrow.io/home
// Visual Crossing Weather
// Meteomatics
// Weatherbit API


//https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/forecast-weather
//https://www.weatherapi.com/my/analytics.aspx

//https://www.visualcrossing.com/weather/weather-data-services

//HISTORY
//https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}&appid={API key}
//https://history.openweathermap.org/data/2.5/history/city?lat=-29.12&lon=-51.98&type=hour&start=1757609600&end=1757696000&appid=0cad9945fb3f366ef52ffff59a3022f2
//https://history.openweathermap.org/data/2.5/history/city?lat=40.7128&lon=-74.0060&type=hour&start=1757609600&end=1757696000&appid=0cad9945fb3f366ef52ffff59a3022f2



//GEOCODING
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//http://api.openweathermap.org/geo/1.0/direct?q=sao paulo&limit=5&appid=0cad9945fb3f366ef52ffff59a3022f2