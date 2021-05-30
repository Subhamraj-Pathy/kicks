import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import ModalReducer from './modalReducer'

const rootReducer = combineReducers({ UserReducer, ModalReducer });

export default rootReducer;
