import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import inputReducer from './input.reducer'
import marketReducer from './markets.reducer'
import deviceReducer from './device.reducer'

const reducers = {
    inputReducer,
    marketReducer,
    deviceReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
