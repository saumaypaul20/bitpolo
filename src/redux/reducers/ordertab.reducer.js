import {TYPES} from '../types';

const init_state = {
  tab: 2,
  price: '',
  amount: '',
  total: '',
  money_prec: null,
  stock_prec: null,
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
        total: parseFloat(state.price * action.payload).toFixed(
          state.money_prec,
        ),
      };
      break;
    case TYPES.SET_ORDER_TAB_PRICE:
      state = {
        ...state,

        price: action.payload,
        total: parseFloat(state.amount * action.payload).toFixed(
          state.money_prec,
        ),
      };
      break;
    case TYPES.SET_ORDER_TAB_TOTAL:
      state = {
        ...state,

        total: action.payload,
        amount: parseFloat(action.payload / state.price).toFixed(
          state.stock_prec,
        ),
      };
      break;
    case TYPES.SET_ORDER_MONEY_PREC:
      state = {
        ...state,

        money_prec: action.payload,
      };
      break;
    case TYPES.SET_ORDER_STOCK_PREC:
      state = {
        ...state,

        stock_prec: action.payload,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default ordertab;
