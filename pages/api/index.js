import { X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } from "@constants/apikey";
import axios from "axios";

export const getFetchData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(`https://${X_RAPIDAPI_HOST}/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "X-RapidAPI-Key": `${X_RAPIDAPI_KEY}`,
        "X-RapidAPI-Host": `${X_RAPIDAPI_HOST}`,
      },
    });
    return data;
  } catch (error) {
    console.log(`Fetch data Error : ${error}`);
    return null;
  }
};
