import { TYPES } from "../types"

const init_state = {
    favourites:[],
    data:[],
}

const  marketReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_MARKET_DATA:
            state = {
                ...state,
                data: action.payload,
                favourites: action.payload.filter(item=> item.isFavourite)
            }
            break
        case TYPES.ADD_DELETE_FAVOURITE:
            state = {
                ...state,
                data: action.payload,
                favourites: action.payload.filter(item=> item.isFavourite)
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default marketReducer;