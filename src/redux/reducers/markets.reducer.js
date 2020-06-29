import { TYPES } from "../types"

const init_state = {
    favourites:[],
    data:[],
}

const  marketReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_MARKET_DATA:
            let arr = [...state.data]
            if(state?.data?.length === 0 ){
                arr.push(action.payload)
                state = {
                    ...state,
                    data: arr,
                }
            }else if(state?.data?.length > 0){
                let index = state?.data?.findIndex(i=> i.params[0] === action.payload.params[0])
                console.log("inex found",index)
                if(index > -1){
              
                    arr[index] = action.payload
                    state = {
                        ...state,
                        data: arr,
                    }
                }else{
                    arr.push(action.payload)
                    state = {
                        ...state,
                        data: arr,
                    }
                }
            }
            // state = {
            //     ...state,
            //     data: action.payload,
            //     favourites: action.payload.filter(item=> item.isFavourite)
            // }
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