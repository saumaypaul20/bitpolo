import { TYPES } from "../types"
import { equalityFnDepths } from "../../utils/reduxChecker.utils"
import _ from 'lodash';

let eq = 0
const init_state = {
    kline:[]
}

const  klineReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_KLINE_DATA:
            // let found = state.kline.some(i=> 
            //          i.params[6] === action.payload.params[6]
            //      )
         
                state = {
                    ...state,
                    kline:[...state.kline,action.payload],
                }
             
                
                
            break
        case TYPES.ADD_KLINE_QUERY_DATA:
            
                let arr =  action.payload.map(i=>{
                    let item={}
                    item.params= i
                    return item
                })
                //console.log("BIG ARRRRRRRRRRAAAUUUUUU----------------------------", arr)
                state = {
                    ...state,
                    kline: arr,
                }
             
                
                
            break

        case TYPES.EMPTY_KLINE_DATA:
            state = {
                ...state,
                kline:[]
            }
            break
        default:
            return state;
    }
    return state;
}

export default klineReducer;