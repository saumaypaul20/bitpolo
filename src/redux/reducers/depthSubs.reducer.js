import { TYPES } from "../types"
import { equalityFnMarket } from "../../utils/reduxChecker.utils"
let eq = 0
const init_state = {
    favourites: [],
    data: null,
    socketConnected: false
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
                // let index = state?.data?.findIndex(i=> i.params[0] === action.payload.params[0])
                // console.log("inex found",index)
                
              
                    //arr[index] = action.payload
                    // console.log("eq2 bool val" ,equalityFnMarket(action.payload.params[1].asks,state?.data?.params[1].asks))
                    // if(!equalityFnMarket(action.payload.params[1].asks,state?.data?.params[1]?.asks)){
                     
                        // console.log("eq2 passed" ,eq)
                        // eq++
                        state = {
                            ...state,
                            data: action.payload
                        }
                    // }
                // else{
                //   console.log("no indx found..now in else");
                  
                //     state = {
                //         ...state,
                //         data: [...state.data, action.payload],
                //     }
                // }
            }
            // state = {
            //     ...state,
            //     data: action.payload,
            //     favourites: action.payload.filter(item=> item.isFavourite)
            // }
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