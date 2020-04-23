import AsyncStorage from '@react-native-community/async-storage';
import api from '../../api';
export const SET_CARTS = 'SET_CARTS';
export const ADD_CART = 'ADD_CART';
export const SET_TOTAL = 'SET_TOTAL';

export const fetchCarts = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get('/cart', {
      headers: {
        token,
      },
    });
    const loadedData = response.data;
    let total = 0;
    if (loadedData !== null) {
      response.data.CartItems.forEach(el => {
        total += el.Item.price * el.quantity;
      });
      dispatch({type: SET_TOTAL, payload: total});
    }

    dispatch({type: SET_CARTS, payload: loadedData});
  } catch (err) {
    throw new Error(err.response);
  }
};

export const addCart = ({ItemId, quantity}) => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');

    await api({
      method: 'POST',
      url: '/cart',
      headers: {
        token: token,
      },
      data: {
        ItemId: ItemId,
        quantity: quantity,
      },
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    }
  }
};

export const removeCart = ItemId => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');

    await api({
      method: 'DELETE',
      url: `/cart/${ItemId}`,
      headers: {
        token: token,
      },
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    }
  }
};
