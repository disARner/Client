import {SET_CARTS, SET_TOTAL} from '../actions/cart';
const initialState = {
  carts: [],
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARTS:
      return {
        carts: action.payload,
      };
    case SET_TOTAL:
      return {
        carts: {...initialState, total: action.payload},
      };
    default:
      return state;
  }
};
