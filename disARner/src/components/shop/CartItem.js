/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import CurrencyFormatter from '../../utils/currencyFormatter';

import Colors from '../../constants/Colors';

const CartItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>{CurrencyFormatter(props.price)}</Text>
              <View style={{padding: 2, width: '85%'}}>
                <Text style={styles.description}>Jumlah: 2</Text>
              </View>
            </View>
            <View style={styles.actions} />
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    backgroundColor: 'white',
    elevation: 1,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  touchable: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: 110,
    height: 140,
  },
  details: {
    alignItems: 'flex-start',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginVertical: 4,
    fontFamily: 'AirbnbCerealMedium',
    color: Colors.blackish,
  },
  price: {
    fontSize: 12,
    color: Colors.accent,
    fontFamily: 'AirbnbCerealBook',
  },
  description: {
    fontFamily: 'AirbnbCerealLight',
    fontSize: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default CartItem;
