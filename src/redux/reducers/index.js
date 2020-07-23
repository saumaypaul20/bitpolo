import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import authReducer from './auth.reducer'
import marketReducer from './markets.reducer'
import deviceReducer from './device.reducer'
import walletReducer from './wallet.reducer'
import depthSubsReducer from './depthSubs.reducer'
import dealsReducer from './deals.reducer'
import payments from './payments.reducer'

const reducers = {
    authReducer,
    marketReducer,
    deviceReducer,
    walletReducer,
    depthSubsReducer,
    payments,
    dealsReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
