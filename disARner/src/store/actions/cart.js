import AsyncStorage from '@react-native-community/async-storage';
import api from '../../api';
export const SET_CARTS = 'SET_CARTS';

export const fetchCarts = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get('http://localhost:3000/cart', {
      headers: {
        token,
      },
    });
    const loadedData = response.data;
    dispatch({type: SET_CARTS, payload: loadedData});
  } catch (err) {
    console.log(err.response.data, 'dari error fetchcarts');
  }
};
