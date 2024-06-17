import axios from "axios";
import { PlaceNames, Place } from "../models/placeModel";
// http://api.geonames.org/searchJSON?q=sao+paulo%20sp&maxRows=10&username=fe.brenos
export const getCitiesByName = async (query: string): Promise<PlaceNames[]> => {
    try {
        const limit = 5; // Limitando a 5 resultados
        const response = await axios.get(`http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=fe.brenos`);
        // const cities = response.data.geonames.map((item: any) => ({ placeName: item.name })).slice(0, limit);
        const citiesSet = new Set<string>();
        const cities: Place[]= [];

        response.data.geonames.forEach((item:any) =>{
            if(!citiesSet.has(item.name)){
                citiesSet.add(item.name)
                cities.push({
                    placeName: item.name,
                    latLong: `${item.lat},${item.lng}`
                });
            }
        })

        //limit of values
        return cities.slice(0, limit)
    } catch (error) {
        throw error;
    }
};
