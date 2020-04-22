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
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchItem from '../../components/shop/SearchItem';

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);

  const products = useSelector(state => state.products.availableProducts);

  const backButton = () => {
    props.navigation.dispatch(CommonActions.goBack());
    setText('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const filter = products.filter(state => {
        return state.name.toLowerCase().includes(text.toLowerCase());
      });

      setFilteredStates(filter);
    }, 1000);

    return () => clearTimeout(timer);
  }, [products, text]);

  return (
    <View>
      <View style={styles.searchBoxOutter}>
        <View style={styles.serachBoxContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                backButton();
              }}>
              <Ionicons name="md-arrow-back" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBox}>
            <TextInput
              value={text}
              onChangeText={value => setText(value)}
              textAlign={'left'}
              placeholder='Try "Nike"'
              style={styles.inputStyle}
            />
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons name="md-search" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {filteredStates.length && text.length > 1 ? (
          <FlatList
            data={filteredStates}
            renderItem={itemData => (
              <SearchItem
                image={itemData.item.imageUrl}
                title={itemData.item.name}
                price={itemData.item.price}
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
        ) : (
          <View style={styles.emptyItemContainer}>
            {text.length ? (
              <Text style={styles.emptyItemText}>Searching...</Text>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxOutter: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    borderRadius: 4,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
  },
  serachBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    fontFamily: 'AirbnbCerealLight',
  },
  emptyItemText: {
    fontFamily: 'AirbnbCerealLight',
    fontSize: 18,
    color: '#7e7e7e',
  },
  emptyItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
