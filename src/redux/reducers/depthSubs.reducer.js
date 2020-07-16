import { TYPES } from "../types"
import { equalityFnMarket, equalityFnDepths } from "../../utils/reduxChecker.utils"
import _ from 'lodash';

let eq = 0
const init_state = {
    favourites: [],
    data: null,
    asks:[],
    bids:[],
    socketConnected: false,
    market_data:[]
}

const  depthSubsReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_DEPTH_SUBS_DATA:
            //let arr = [...state.data]
            if(!state?.data){
                
                state = {
                    ...state,
                    data: action.payload,
                }
            }else if(state?.data){
                // let found = state?.data?.params[2]
                if(state?.data?.params[2] === action?.payload?.params[2]){
                    let diffasks= equalityFnDepths(action.payload.params[1].asks, state.data.params[1].asks)
                    let diffbids= equalityFnDepths(action.payload.params[1].bids, state.data.params[1].bids)

                    if(!diffasks || !diffbids){
                        state = {
                            ...state,
                            data: action.payload
                        }
                    }
                }else{
                    state = {
                        ...state,
                        data: action.payload
                    }
                }
                      
                 
            }
            // state = {
            //     ...state,
            //     data: action.payload,
            //     favourites: action.payload.filter(item=> item.isFavourite)
            // }
            break
        case TYPES.ADD_DEPTH_ASKS:
            //let arr = [...state.data]
            if(state?.asks.length == 0){
                
                state = {
                    ...state,
                    asks: action.payload,
                }
            }else if(state?.asks.length> 0){
                let found = _.differenceWith(state.asks, action.payload, _.isEqual);
                if(found.length>0){
                        state = {
                            ...state,
                            asks: action.payload
                        }  
                }         
            }
            break
     
      
        case TYPES.ADD_DEPTH_BIDS:
            //let arr = [...state.data]
            if(state?.bids.length == 0){
                
                state = {
                    ...state,
                    bids: action.payload,
                }
            }else if(state?.bids.length > 0){
                let found = _.differenceWith(state.bids, action.payload, _.isEqual);
                if(found.length>0){
                        state = {
                            ...state,
                            bids: action.payload
                        }  
                }         
            }
            break
     
      
        case TYPES.TRIGGER_SOCKET_FOR_DEPTH_SUBS:
            state = {
                ...state,
               socketConnected: true
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default depthSubsReducer;