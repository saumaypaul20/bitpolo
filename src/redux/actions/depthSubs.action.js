import { TYPES } from "../types";

export const addDepthSubs =(data) =>{
    return {
        type: TYPES.ADD_DEPTH_SUBS_DATA,
        payload: data,
      };
}

// export const modifyFavs = (data) =>{
//     return{
//         type:TYPES.ADD_DELETE_FAVOURITE,
//         payload: data
//     }
// }
export const triggerDepthSubsSocket = () =>{
    return{
        type:TYPES.TRIGGER_SOCKET_FOR_DEPTH_SUBS,
        payload: true
    }
}
