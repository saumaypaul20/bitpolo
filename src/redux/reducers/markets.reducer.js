import { TYPES } from "../types"
import { equalityFnMarket } from "../../utils/reduxChecker.utils"
let eq = 0
const init_state = {
    favourites: [],
    data: [],
    socketConnected: false,
    index_price: null,
    currencies:[],
    activeTradePair: null,
    market_list: []
}

const  marketReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_MARKET_DATA:
            let arr = [...state.data]
            if(state?.data?.length === 0 ){
                
                state = {
                    ...state,
                    data: [...state.data, action.payload],
                }
            }else if(state?.data?.length > 0){
                let index = state?.data?.findIndex(i=> i.params[0] === action.payload.params[0])
                console.log("inex found",index)
                if(index > -1){
                    // console.log("eq2 bool val" ,equalityFnMarket([action.payload],[arr[index]]))
                    if(!equalityFnMarket([action.payload],[arr[index]])){
                        // console.log("eq2 passed" ,eq)
                        eq++
                        state = {
                            ...state,
                            data: [...state.data.slice(0, index), action.payload, ...state.data.slice(index+1)],
                        }
                    }
                }else{
                  console.log("no indx found..now in else");
                  
                    state = {
                        ...state,
                        data: [...state.data, action.payload],
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
                favourites: action.payload,
                // favourites: action.payload.filter(item=> item.isFavourite)
            }
            break
      
        case TYPES.TRIGGER_SOCKET_FOR_MARKET:
            state = {
                ...state,
               socketConnected: true
            }
            break
        case TYPES.STORE_INDEX_PRICE:
            state = {
                ...state,
               index_price: action.payload
            }
            break
        case TYPES.STORE_CURRENCIES:
            state = {
                ...state,
               currencies: action.payload
            }
            break
        case TYPES.SET_ACTIVE_TRADE_PAIR:
            state = {
                ...state,
               activeTradePair: action.payload
            }
            break
      
        case TYPES.ADD_MARKET_LIST:
            state = {
                ...state,
                market_list: action.payload
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default marketReducer;