import { SET_USER_ID, SET_USER_DATA } from '../type/types';

const initialState = {
  userId: '',
  userData: {
    address: [],
    email: '',
    createdAt: 0,
    id: '',
    name: '',
    bag: [],
    wishlist: [],
    orderHistory: []
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload.userData
      }
    default:
      return state;
  }
}

export default userReducer;