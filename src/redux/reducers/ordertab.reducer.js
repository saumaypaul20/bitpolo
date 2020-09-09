import {TYPES} from '../types';

const init_state = {
  tab: 2,
  price: 0,
  amount: 0,
  total: 0,
};

const ordertab = (state = init_state, action) => {
  switch (action.type) {
    case TYPES.CURRENT_ORDER_TAB:
      state = {
        ...state,
        tab: action.payload,
      };
      break;
    case TYPES.SET_ORDER_TAB_AMOUNT:
      state = {
        ...state,

        amount: action.payload,
      };
      break;
    case TYPES.SET_ORDER_TAB_PRICE:
      state = {
        ...state,

        price: action.payload,
      };
      break;
    case TYPES.SET_ORDER_TAB_TOTAL:
      state = {
        ...state,

        total: action.payload,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default ordertab;
