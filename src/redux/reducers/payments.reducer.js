import { TYPES } from "../types";

const init_state = {
    banks:[],
   
}

const  payments = (state = init_state, action) => {
    switch (action.type) {
        case TYPES.ADD_NEW_BANK:
            state = {
                ...state,
                banks: action.payload
            }
            break
        case TYPES.DELETE_NEW_BANK:
            state = {
                ...state,
                banks: state.banks.filter(i=> i.type_of_account.bank_account.account_number !== action.payload.type_of_account.bank_account.account_number)
            }
            break
      
        default:
            return state;
    }
    return state;
}

export default payments;