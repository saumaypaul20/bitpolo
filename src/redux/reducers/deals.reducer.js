import { TYPES } from "../types"
import { equalityFnDepths } from "../../utils/reduxChecker.utils"
import _ from 'lodash';

let eq = 0
const init_state = {
    deals:[]
}

const  dealsReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_DEALS_DATA:
            let found = state.deals.find(i=> i.params[0] === action.payload.params[0])
            if(found){
                let sameTime = state.deals.findIndex(i=>i.params[1][0].t === action.payload.params[1][0].t)
                if(sameTime === -1){
                    if(state.deals.length < 10){
                        state = {
                            ...state,
                            deals:[...state.deals,action.payload],
                        }
                    
                    }else{
                        state = {
                            ...state,
                            deals: [...state.deals.slice(1,10), action.payload]
                        }
                    
                    }
                }
            }else{
                state = {
                    ...state,
                    deals:[action.payload],
                }
            }
                
                
            break
        case TYPES.CLEAR_DEALS_DATA:
                state={
                    ...state,
                    deals:[]
                }
        default:
            return state;
    }
    return state;
}

export default dealsReducer;