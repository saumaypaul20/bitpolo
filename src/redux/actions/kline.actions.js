import { TYPES } from "../types";

export const addKlineData =(data) =>{
    
    return {
        type: TYPES.ADD_KLINE_DATA,
        payload: data,
      };
}
 
export const emptyKlineData =() =>{
    
    return {
        type: TYPES.EMPTY_KLINE_DATA,
      
      };
}
 