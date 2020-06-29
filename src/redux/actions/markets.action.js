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

// export const addMarketData =(result) =>{
//     let state = store.getState();
//     let marketdata = state.marketReducer.data;
//     let index = marketdata.findIndex(x => x.params[0] === result.params[0])

//     if(index){
//         return {
//             type: TYPES.UPDATE_MARKET_DATA_ITEM,
//             payload: data,
//             index: index
//           };
//     }else{
//         return {
//             type: TYPES.ADD_MARKET_DATA,
//             payload: data,
//           };
//     }
    
// }