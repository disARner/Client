import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  const dispatch = useDispatch();

  const windowWidth = Dimensions.get('screen').width;
  const windowHeight = Dimensions.get('screen').height;

  return (
    <ScrollView>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View style={{width: windowWidth}}>
        <View style={{width: windowWidth, height: 587}}>
          <Image
            style={styles.image}
            source={{uri: selectedProduct.imageUrl}}
          />
        </View>
        <View style={styles.action}>
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </View>
        <Text style={styles.price}> ${selectedProduct.price.toFixed(2)} </Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle,
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 508,
    resizeMode: 'cover',
  },
  action: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'OpenSans-Regular',
  },
});

export default ProductDetailScreen;
