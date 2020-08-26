import { TYPES } from "../types";

export const addKlineData =(data) =>{
    
    return {
        type: TYPES.ADD_KLINE_DATA,
        payload: data,
      };
}
export const addKlineQueryData =(data) =>{
    //alert(JSON.stringify(data))
    return {
        type: TYPES.ADD_KLINE_QUERY_DATA,
        payload: data,
      };
}
 
export const emptyKlineData =() =>{
    
    return {
        type: TYPES.EMPTY_KLINE_DATA,
      
      };
}
 
 
export const updateKlineBool =(bool) =>{
    
    return {
        type: TYPES.UPDATE_KLINE_BOOL,
        payload: bool
      
      };
}
 