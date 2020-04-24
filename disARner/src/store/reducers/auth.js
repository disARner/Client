import {SET_TOKEN, SET_AUTHENTICATED} from '../actions/auth';

const initialState = {
  token: '',
  auth: false,
  // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.payload,
      };
    case SET_AUTHENTICATED:
      return {
        auth: action.payload,
      };
    default:
      return state;
  }
};
