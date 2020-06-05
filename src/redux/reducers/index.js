import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import inputReducer from './input.reducer'
import marketReducer from './markets.reducer'


const reducers = {
    inputReducer,
    marketReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
