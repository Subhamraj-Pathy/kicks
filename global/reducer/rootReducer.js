import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import ModalReducer from './modalReducer'
import ToastReducer from './toastReducer';

const rootReducer = combineReducers({ UserReducer, ModalReducer, ToastReducer });

export default rootReducer;
