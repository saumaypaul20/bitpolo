import { TYPES } from "../types";

export const fetchedWalletBalance =(data) =>{
    return {
        type: TYPES.FETCHED_WALLET_BALANCE,
        payload: data,
      };
}

export const fetchedWalletAssets = (data) =>{
    return{
        type:TYPES.FETCHED_WALLET_ASSETS,
        payload: data
    }
}