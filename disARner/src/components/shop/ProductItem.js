import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>Rp. {props.price.toFixed(2)}</Text>
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
    // elevation: 0.5,
    // borderRadius: 6,
    backgroundColor: 'transparent',
    height: 190,
    width: 110,
    margin: 20,
  },
  touchable: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    // width: '100%',
    // height: '70%',
    elevation: 0.5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 110,
    height: 140,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 12,
    marginVertical: 4,
    fontFamily: 'AirbnbCerealMedium',
    color: Colors.blackish,
  },
  price: {
    fontSize: 10,
    color: Colors.accent,
    fontFamily: 'AirbnbCerealBook',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default ProductItem;
