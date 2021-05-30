import { SET_TOAST, CLEAR_TOAST } from '../type/types';

export const setToast = (args) => dispatch => {
  dispatch({ type: SET_TOAST, payload: { type: args.type, message: args.message } });
}

export const clearToast = () => dispatch => {
  dispatch({ type: CLEAR_TOAST, payload: {  } });
}