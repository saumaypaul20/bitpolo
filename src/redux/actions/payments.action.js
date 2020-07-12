import { TYPES } from "../types";

export const addBanks =(banks) =>{
    return {
        type: TYPES.ADD_NEW_BANK,
        payload: banks,
      };
}
export const deleteBanks =(banks) =>{
    return {
        type: TYPES.DELETE_NEW_BANK,
        payload: banks,
      };
}
