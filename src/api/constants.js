export const BASE_URL = 'https://corpus.bitpolo.com/api/v1';
export const WEBSOCKET = 'wss://msocket.bitpolo.com';

// export const BASE_URL ='https://crux.bitpolo.com/api/v1';
// export const WEBSOCKET = 'wss://socket.bitpolo.com'

export const MOBIKWIK_URL = 'https://api.zaakpay.com/api/paymentTransact/V7';
/* -------------------------------- USERS API ------------------------------- */

export const USERS = {
  GEOLOCATION_DB: 'https://geolocation-db.com/json/',
  ENCRYPT: '/user/encrypt',
  REGISTER: '/user/registration',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  VALIDATE_OTP: '/user/validate/otp',
  G2F_VERIFY: '/user/g2f-verify',
  RESEND_OTP: '/user/resend/otp',
  FORGET_PASSWORD: '/user/forget-password',
  RESET_PASSWORD: '/user/reset-password',
  GENERATE_OTP: '/user/generate/otp',
  TRADE_VOLUME: '/user/trade-volume',
  GET_MARKET_LIST: '/user/market/list',
  GET_MARKET_BY_PAIR: '/user/market/pairs',
  MODIFY_FAV_COIN: '/user/favourite',
};

/* ------------------------------- WALLET API ------------------------------- */

export const WALLET = {
  GET_ASSET: '/wallet/assets',
  GET_BALANCE: '/wallet/balance',
  CREATE_ASSET_ADDRESS: '/wallet/asset-address',
  WITHDRAW: '/wallet/withdraw',
  DEPOSIT: '/payment/deposit',
  GET_WITHDRAW_ADDRESSES: '/wallet/withdraw-address',
  CREATE_WITHDRAW_ADDRESS: '/wallet/withdraw-address',
  GET_DEPOSIT_TRANSACTIONS: '/wallet/transactions/deposit',
  GET_WITHDRAW_TRANSACTIONS: '/wallet/transactions/withdraw',
};

/* ------------------------------- MARKETS API ------------------------------- */

export const MARKETS = {
  INDEX_PRICE: '/market/index-price',
  MARKET_LIST: '/matching/market/list',
};
/* ------------------------------- SECURITY API ------------------------------- */

export const SECURITY = {
  DEVICE_HISTORY: '/user/device-history',
  G2F_CREATE: '/user/g2f-create',
  G2F_SETTINGS: '/user/g2f-settings',
  CHANGE_PASSWORD: '/user/change-password',
};

/* ------------------------------- PAYMENT API ------------------------------- */

export const PAYMENT = {
  ADD_BANK_ACCOUNT: '/payment/traditional-bank-account',
  WITHDRAW_REQUEST: '/payment/withdraw',
};
/* ------------------------------- ORDERS API ------------------------------- */

export const ORDERS = {
  ORDER_PUT: '/matching/order/',
  GET_PENDING_ORDERS: '/matching/order/pending',
  CANCEL_ORDER: '/matching/order/cancel',
  CANCEL_ALL: '/matching/all/orders/cancel',
};
