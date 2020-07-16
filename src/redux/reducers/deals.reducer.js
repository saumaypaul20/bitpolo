import { TYPES } from "../types"
import { equalityFnDepths } from "../../utils/reduxChecker.utils"
import _ from 'lodash';

let eq = 0
const init_state = {
    deals:null
}

const  dealsReducer = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_DEALS_DATA:
            if(!state?.deals){
                
                state = {
                    ...state,
                    deals: action.payload,
                }
            }else if(state?.deals){
               
                if(state?.deals?.params[0] === action?.payload?.params[0]){
                    let diffdeals= equalityFnDepths(action.payload.params[1], state.deals.params[1])

                    if(!diffdeals){
                        state = {
                            ...state,
                            deals: action.payload
                        }
                    }
                }else{
                    state = {
                        ...state,
                        deals: action.payload
                    }
                }
            }
            break

        default:
            return state;
    }
    return state;
}

export default dealsReducer;