import { TYPES } from "../types";

export const addMarketData =(data) =>{
    return {
        type: TYPES.ADD_MARKET_DATA,
        payload: data,
      };
}

export const modifyFavs = (data) =>{
    return{
        type:TYPES.ADD_DELETE_FAVOURITE,
        payload: data
    }
}
