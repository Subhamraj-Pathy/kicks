import { SET_USER_ID, SET_USER_DATA } from '../type/types';

export const setUserIdFromFirebase = (userId) => dispatch => {
  dispatch({ type: SET_USER_ID, payload: { userId } })
}

export const setUserData = (userData) => dispatch => {
  dispatch({ type: SET_USER_DATA, payload: { userData } });
}