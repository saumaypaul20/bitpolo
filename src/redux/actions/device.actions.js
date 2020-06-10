import { TYPES } from "../types";

export const addDeviceId =(payload) =>{
    return {
        type: TYPES.ADD_DEVICE_ID,
        payload: payload,
      };
}