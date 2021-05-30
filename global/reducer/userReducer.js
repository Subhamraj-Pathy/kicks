import { SET_USER_ID } from '../type/types';

const initialState = {
  userId: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId
      };
    default:
      return { ...state };
  }
}

export default userReducer;