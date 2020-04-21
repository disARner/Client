import React, {useEffect} from 'react';
import {
  FlatList,
  Platform,
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import NewItem from '../../components/shop/NewItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/Headerbutton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  return (
    <ScrollView style={{paddingBottom: 10}}>
      <View>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor="transparent"
        />
        <View style={styles.categoryBar}>
          <TouchableCmp>
            <View style={styles.textContainer}>
              <Text style={styles.categoryText}>Cartoon</Text>
              <View style={styles.rectangle} />
            </View>
          </TouchableCmp>
          <TouchableCmp>
            <View style={styles.textContainer}>
              <Text style={styles.categoryText}>Art</Text>
              {/* <View style={styles.rectangle} /> */}
            </View>
          </TouchableCmp>
          <TouchableCmp>
            <View style={styles.textContainer}>
              <Text style={styles.categoryText}>Symbol</Text>
              {/* <View style={styles.rectangle} /> */}
            </View>
          </TouchableCmp>
        </View>
        <View>
          <View style={styles.productVertical}>
            <FlatList
              horizontal={true}
              data={products}
              renderItem={itemData => (
                <NewItem
                  image={itemData.item.imageUrl}
                  title={itemData.item.name}
                  price={itemData.item.price}
                  onViewDetail={() => {
                    props.navigation.navigate('ProductDetail', {
                      productId: itemData.item.id,
                      productTitle: itemData.item.name,
                    });
                  }}
                  onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                  }}
                />
              )}
            />
          </View>
          <View style={styles.productHorizontal}>
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularProductText}>
                Most Popular Products
              </Text>
            </View>
            <FlatList
              data={products}
              horizontal={true}
              renderItem={itemData => (
                <ProductItem
                  image={itemData.item.imageUrl}
                  title={itemData.item.name}
                  price={itemData.item.price}
                  onViewDetail={() => {
                    props.navigation.navigate('ProductDetail', {
                      productId: itemData.item.id,
                      productTitle: itemData.item.title,
                    });
                  }}
                  onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                  }}
                />
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: () => {
      return (
        <View style={styles.logo}>
          <Image source={require('../../assets/HeaderLogo.png')} />
        </View>
      );
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 0,
      height: 100,
    },
  };
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
  },
  productHorizontal: {
    backgroundColor: '#ffffff',
    // paddingBottom: 20,
    // flex: 2,
  },
  productVertical: {
    height: 425,
  },
  categoryBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 8,
    elevation: 0,
    height: 55,
    alignItems: 'center',
    alignContent: 'center',
  },
  categoryText: {
    fontFamily: 'AirbnbCerealMedium',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.blackish,
    // marginBottom: 25,
  },
  popularProductText: {
    fontFamily: 'AirbnbCerealBook',
    fontSize: 18,
    color: Colors.blackish,
  },
  popularTextContainer: {
    marginLeft: 15,
    marginTop: 15,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 5,
    height: '100%',
    width: 83,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: Colors.blackish,
  },
  rectangle: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.blackish,
    alignSelf: 'flex-end',
    // alignSelf: 'flex-end',
    // flex: 1,
  },
});
export default ProductsOverviewScreen;
