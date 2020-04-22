import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as cartActions from '../../store/actions/cart';

import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';

const CartScreen = props => {
  const [text, setText] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.availableProducts);
  const carts = useSelector(state => state.cart.carts);
  useEffect(() => {
    dispatch(cartActions.fetchCarts());
  }, []);

  console.log(carts, 'dari Cartscreens');

  useEffect(() => {
    const timer = setTimeout(() => {
      const filter = products.filter(state => {
        return state.name.toLowerCase().includes(text.toLowerCase());
      });

      setFilteredStates(filter);
    }, 1000);

    return () => clearTimeout(timer);
  }, [products, text]);

  const backButton = () => {
    props.navigation.dispatch(CommonActions.goBack());
    setText('');
  };

  return (
    <View>
      <View style={{marginVertical: 20}}>
        <FlatList
          data={carts.CartItems}
          renderItem={itemData => (
            <CartItem
              image={itemData.item.Item.imageUrl}
              title={itemData.item.Item.name}
              price={itemData.item.Item.price}
              quantity={itemData.item.quantity}
              description={itemData.item.description}
              onViewDetail={() => {
                props.navigation.navigate('ProductDetail', {
                  productId: itemData.item.id,
                  productTitle: itemData.item.name,
                });
              }}
            />
          )}
        />
      </View>
      <View style={styles.actionContainer}>
        <View style={{accent: 10}}>
          <Text style={{fontFamily: 'AirbnbCerealMedium'}}>Total:</Text>
          <Text style={styles.textTotal}>Rp. 20.125</Text>
        </View>
        <View style={styles.buttonAdd}>
          <Text style={styles.buttonAddText}>Checkout</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonAdd: {
    height: 50,
    width: 180,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonAddText: {
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 14,
    fontWeight: '400',
  },
  textTotal: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 18,
    color: Colors.accent,
    alignSelf: 'flex-end',
  },
});

export default CartScreen;
