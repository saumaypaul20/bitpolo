import {TYPES} from '../types';

export const setordertab = val => {
  return {
    type: TYPES.CURRENT_ORDER_TAB,
    payload: val,
  };
};
export const setordertabprice = val => {
  return {
    type: TYPES.SET_ORDER_TAB_PRICE,
    payload: val,
  };
};
export const setordertabamount = val => {
  return {
    type: TYPES.SET_ORDER_TAB_AMOUNT,
    payload: val,
  };
};
export const setordertabtotal = val => {
  return {
    type: TYPES.SET_ORDER_TAB_TOTAL,
    payload: val,
  };
};
