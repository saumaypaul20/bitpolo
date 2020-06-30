import { TYPES } from "../types";


const  walletReducer = (state = {balance: null, assets:[]}, action) => {
    switch (action.type) {
        case TYPES.FETCHED_WALLET_BALANCE:
            state = {
                ...state,
                balance: action.payload
            }
            break
        case TYPES.FETCHED_WALLET_ASSETS:
            state = {
                ...state,
                assets: action.payload
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default walletReducer;