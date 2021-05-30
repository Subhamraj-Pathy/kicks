import { SET_TOAST, CLEAR_TOAST } from '../type/types';

const initialState = {
  type: '',
  message: '',
}

const toastReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_TOAST:
      newState = { ...state, type: action.payload.type, message: action.payload.message };
      return newState;
    case CLEAR_TOAST:
      newState = { ...state, type: '', message: '' };
      return newState;
    default:
      return state;
  }
}

export default toastReducer;