import { TYPES } from "../types";

export const addDealsData =(data) =>{
    return {
        type: TYPES.ADD_DEALS_DATA,
        payload: data,
      };
}
 