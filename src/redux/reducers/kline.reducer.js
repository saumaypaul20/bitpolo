import { TYPES } from "../types"
import { equalityFnDepths } from "../../utils/reduxChecker.utils"
import _ from 'lodash';

let eq = 0
const init_state = {
    kline:[],
    klineQ:[],
    update: false
}

const  klineReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_KLINE_DATA:
             if(state.klineQ.length>0)
            // let found = state.kline.some(i=> 
            //          i.params[6] === action.payload.params[6]
            //      )
                // alert(`yo ${JSON.stringify(action.payload)}`)
                //alert(` ${JSON.stringify(state.update)}`)
                state = {
                    ...state,
                    kline:  [...state.kline.concat([action.payload])]

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
                    klineQ: arr,
                   
                }
             
            break
        case TYPES.UPDATE_KLINE_BOOL:
             
                state = {
                    ...state,
                    update: action.payload,
                   
                }
             
            break

        case TYPES.EMPTY_KLINE_DATA:
            state = {
                ...state,
                kline:[],
                update:false
            }
            break
        default:
            return state;
    }
    return state;
}

export default klineReducer;