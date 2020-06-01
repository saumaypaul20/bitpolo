import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import inputReducer from './input.reducer'


const reducers = {
    inputReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
