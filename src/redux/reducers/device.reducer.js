import { TYPES } from "../types";

const init_state = {
    deviceId:null,
   
}

const  deviceReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_DEVICE_ID:
            state = {
                ...state,
                deviceId: action.payload
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default deviceReducer;