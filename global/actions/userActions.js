import { SET_USER_ID } from '../type/types';

export const setUserIdFromFirebase = (userId) => dispatch => {
  dispatch({ type: SET_USER_ID, payload: { userId } })
}