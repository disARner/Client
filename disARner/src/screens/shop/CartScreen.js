/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../api';

import * as cartActions from '../../store/actions/cart';
import CurrencyFormatter from '../../utils/currencyFormatter';

import Colors from '../../constants/Colors';

const CartCard = props => {
  const [quantity, setQuantity] = useState(props.quantity);

  const stock = props.stock;
  const dispatch = useDispatch();

  const addQuantityHandler = async () => {
    try {
      let increament = 1;
      if (quantity === stock) {
        increament = 0;
      }
      await setQuantity(quantity + increament);
      const token = await AsyncStorage.getItem('token');
      await api({
        method: 'PUT',
        url: `/cart/${props.id}`,
        data: {quantity: quantity + 1},
        headers: {
          token: token,
        },
      });
      await dispatch(cartActions.fetchCarts());
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const decreaseQuantityHandler = async () => {
    try {
      let decreament = 1;
      if (quantity === 1) {
        decreament = 0;
      }
      setQuantity(quantity - decreament);

      const token = await AsyncStorage.getItem('token');

      await api({
        method: 'PUT',
        url: `/cart/${props.id}`,
        data: {quantity: quantity},
        headers: {
          token: token,
        },
      });

      await dispatch(cartActions.fetchCarts());
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const removeCart = async () => {
    await dispatch(cartActions.removeCart(props.id));
    await dispatch(cartActions.fetchCarts());
  };

  return (
    <View style={styles.cartCard}>
      <Image
        style={styles.cartImage}
        // resizeMethod="resize"
        source={{uri: props.image}}
      />
      <View style={styles.cartInfo}>
        <Text style={{fontWeight: 'bold', fontSize: 20, paddingVertical: 10}}>
          {props.title}
        </Text>
        <Text style={{fontFamily: 'AirbnbCerealBook', color: Colors.accent}}>
          {CurrencyFormatter(props.price)}
        </Text>
        <View style={styles.quantityController}>
          <TouchableOpacity onPress={decreaseQuantityHandler}>
            <Text
              style={{fontWeight: 'bold', fontSize: 25, paddingHorizontal: 15}}>
              -
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityText}
            autoCompleteType="off"
            editable={false}
            value={`${quantity}`}
            keyboardType="numeric"
            textAlign="center"
          />
          <TouchableOpacity onPress={addQuantityHandler}>
            <Text
              style={{fontWeight: 'bold', fontSize: 25, paddingHorizontal: 15}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={removeCart}
        style={{
          ...styles.button,
          height: 30,
          width: 100,
          marginTop: 70,
          marginRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Ionicons name="md-trash" size={16} color="white" />
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              fontFamily: 'AirbnbCerealBook',
            }}>
            {' '}
            Remove
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CheckoutScreen = props => {
  const dispatch = useDispatch();

  const carts = useSelector(state => state.cart.carts);
  const total = useSelector(state => state.cart.total);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const loadCarts = async () => {
      setIsLoading(true);
      try {
        await dispatch(cartActions.fetchCarts());
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    loadCarts();
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCart = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(cartActions.fetchCarts());
    } catch (err) {
      setError(err);
    }
    setIsRefreshing(false);
  });

  if (error) {
    return (
      <View style={styles.loadingView}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  const checkout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api.put({
        method: 'PUT',
        url: '/cart/checkout',
        headers: {
          token: token,
        },
      });
      await dispatch(cartActions.fetchCarts());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {carts ? (
        <FlatList
          data={carts.CartItems}
          onRefresh={loadCart}
          refreshing={isRefreshing}
          refreshControl={isRefreshing}
          renderItem={itemData => (
            <CartCard
              image={itemData.item.Item.imageUrl}
              title={itemData.item.Item.name}
              price={itemData.item.Item.price}
              quantity={itemData.item.quantity}
              id={itemData.item.ItemId}
              stock={itemData.item.Item.stock}
              onViewDetail={() => {
                props.navigation.navigate('ProductDetail', {
                  productId: itemData.item.id,
                  productTitle: itemData.item.name,
                });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.emptyItemContainer}>
          <Text style={styles.emptyItemText}>No carts yet</Text>
        </View>
      )}
      <View style={styles.cartBottomController}>
        <View>
          <Text style={{fontSize: 20, fontFamily: 'AirbnbCerealMedium'}}>
            Total Harga:
          </Text>
          <Text style={{fontFamily: 'AirbnbCerealBook'}}>
            {CurrencyFormatter(total)}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={checkout}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  emptyItemText: {
    fontFamily: 'AirbnbCerealLight',
    fontSize: 24,
    color: '#7e7e7e',
  },
  emptyItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    color: '#37315e',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  button: {
    height: 50,
    width: 180,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    backgroundColor: 'transparent',
    fontFamily: 'AirbnbCerealMedium',
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    elevation: 3,
    width: Dimensions.get('screen').width - 20,
    height: 180,
    marginVertical: 5,
    borderRadius: 6,
    paddingRight: 5,
  },
  cartImageContainer: {
    flex: 1,
    alignItems: 'center',
    height: 100,
  },
  cartImage: {
    // width: 120,
    flex: 1,
    alignItems: 'center',
    height: '100%',
    // alignSelf: 'center',
    paddingRight: 25,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  cartInfo: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 10,
    // marginLeft: 5,
  },
  quantityController: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  quantityText: {
    borderBottomColor: Colors.blackish,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  cartBottomController: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: '15%',
    backgroundColor: '#fdfdfd',
    elevation: 10,
    // flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
