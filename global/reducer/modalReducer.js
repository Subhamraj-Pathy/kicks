import { OPEN_MODAL, CLOSE_MODAL } from '../type/types';

const initialState = {
  modalState: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalState: action.payload.modalState };
    case CLOSE_MODAL:
      return { ...state, modalState: action.payload.modalState }
    default:
      return { ...state };
  }
}

export default modalReducer;