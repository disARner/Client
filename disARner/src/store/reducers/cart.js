import {SET_CARTS} from '../actions/cart';
const initialState = {
  carts: [],
  // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARTS:
      return {
        carts: action.payload,
      };
    default:
      return state;
  }
};
