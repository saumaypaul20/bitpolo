export const BASE_URL ='https://corpus.bitpolo.com/api/v1';
// export const BASE_URL ='http://3.244.24.123/api/v1';
export const WEBSOCKET = 'wss://msocket.bitpolo.com'

/* -------------------------------- USERS API ------------------------------- */

 export const USERS = {
    GEOLOCATION_DB : 'https://geolocation-db.com/json/',
    ENCRYPT : '/user/encrypt',
    REGISTER : '/user/registration',
    LOGIN : '/user/login',
    VALIDATE_OTP : '/user/validate/otp' ,
    G2F_VERIFY : '/user/g2f-verify' ,
    RESEND_OTP : '/user/resend/otp' ,
    FORGET_PASSWORD : '/user/forget-password',
    RESET_PASSWORD : '/user/reset-password',
    GENERATE_OTP : '/user/generate/otp',
    TRADE_VOLUME : '/user/trade-volume',
    GET_MARKET_LIST : '/user/market/list',
    GET_MARKET_BY_PAIR : '/user/market/pairs',
    LOGOUT : '/user/logout'
}

/* ------------------------------- WALLET API ------------------------------- */

export const WALLET = {
    GET_ASSET : '/wallet/assets'
}