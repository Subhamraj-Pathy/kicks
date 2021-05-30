import { OPEN_MODAL, CLOSE_MODAL } from '../type/types';

export const setModalTrue = () => dispatch => {
  dispatch({ type: OPEN_MODAL, payload: { modalState: true } });
}

export const setModalFalse = () => dispatch => {
  dispatch({ type: CLOSE_MODAL, payload: { modalState: false } });
}