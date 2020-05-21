import reducerTransaction from './reducerTransaction';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    trans: reducerTransaction,
});

export default rootReducer;