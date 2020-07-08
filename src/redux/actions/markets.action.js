import { TYPES } from "../types";

export const addMarketData =(data) =>{
    return {
        type: TYPES.ADD_MARKET_DATA,
        payload: data,
      };
}
export const addMarketList =(data) =>{
    return {
        type: TYPES.ADD_MARKET_LIST,
        payload: data,
      };
}

export const modifyFavs = (data) =>{
    return{
        type:TYPES.ADD_DELETE_FAVOURITE,
        payload: data
    }
}
export const triggerMarketSocket = () =>{
    return{
        type:TYPES.TRIGGER_SOCKET_FOR_MARKET,
        payload: true
    }
}
export const storeIndexPrice = (payload) =>{
    return{
        type:TYPES.STORE_INDEX_PRICE,
        payload: payload
    }
}
export const storeCurrencies = (payload) =>{
    return{
        type:TYPES.STORE_CURRENCIES,
        payload: payload
    }
}
export const setActiveTradePair = (payload) =>{
    return{
        type:TYPES.SET_ACTIVE_TRADE_PAIR,
        payload: payload
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