import React, { useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Colors from '../../constants/Colors';
// import { useSelector, useDispatch } from 'react-redux';
// import {} from '../../store';

//ITEMS dari store ntar
const ITEMS = [1, 2, 3, 4, 5]

//CartCard bisa djadiin satu file terpisah kalo mau
const CartCard = () => {
  //quantity sama stock diganti data dr db
  const [quantity, setQuantity] = useState(1)
  const stock = 10

  const addQuantityHandler = () => {
    let increament = 1
    if (quantity === stock) increament = 0
    setQuantity(quantity + increament)
  }

  const decreaseQuantityHandler = () => {
    let decreament = 1
    if (quantity === 1) decreament = 0
    setQuantity(quantity - decreament)
  }

  return (
    <View style={styles.cartCard}>
        <View style={styles.cartImageContainer}>
          <Image 
            style={styles.cartImage}
            resizeMethod="resize"
            source={{
              uri
            }}
          />
        </View>
        <View style={styles.cartInfo}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}>Item Name</Text>
          <Text style={{ paddingVertical: 10 }}>Rp {(75000).toLocaleString('id')}</Text>
          <View style={styles.quantityController}>
            <TouchableOpacity 
              onPress={decreaseQuantityHandler}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 25, paddingHorizontal: 15 }}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityText}
              autoCompleteType="off"
              editable={false}
              value={`${quantity}`}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              onPress={addQuantityHandler}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 25, paddingHorizontal: 15 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{ ...styles.button, height: 30, width: 100, marginTop: 70, marginRight: 10 }}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
  )
}

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <Text style={styles.titleText}>Cart</Text>
      <FlatList 
        data={ITEMS}
        keyExtractor={i => ITEMS[i]}
        renderItem={() => (
          <CartCard />
        )}
      />
      <View style={styles.cartBottomController}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Harga:</Text>
          <Text>Rp {(375000).toLocaleString('id')}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Chekout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckoutScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  titleText: {
    fontSize: 30,
    color: '#37315e',
    fontWeight: 'bold',
    textAlign: 'center', 
    paddingVertical: 20
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.blackish,
    width: 150,
    height: '30%'
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    backgroundColor: 'transparent',
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    elevation: 3,
    width: Dimensions.get('screen').width - 20,
    height: 180,
    marginVertical: 5
  },
  cartImageContainer: {
    flex: 1,
    alignItems: 'center',
    height: 100
  },
  cartImage: {
    width: 100
  },
  cartInfo: {
    flex: 2,
    justifyContent: 'center'
  },
  quantityController: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  quantityText: {
    borderBottomColor: Colors.blackish,
    borderBottomWidth: 1,
    fontSize: 16
  },
  cartBottomController: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: '15%',
    backgroundColor: '#fdfdfd',
    elevation: 10
  }
});