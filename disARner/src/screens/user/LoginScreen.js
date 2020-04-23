/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const windowWidth = Dimensions.get('screen').width;

  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(authActions.login(email, password));
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View
        style={{...styles.container, width: windowWidth, marginBottom: 100}}>
        <Text
          style={{
            ...styles.titleText,
            margin: 50,
            fontSize: 50,
            fontFamily: 'AirbnbCerealExtraBold',
          }}>
          disARner
        </Text>
        <Text style={styles.titleText}>Login</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : (
          <></>
        )}
        {error ? <Text>Email or password is wrong.</Text> : <></>}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity>
          <View
            style={{
              ...styles.button,
              width: 150,
              marginVertical: 15,
              paddingHorizontal: 5,
            }}
            onTouchStart={handleLogin}>
            <Text
              style={{
                ...styles.buttonText,
                fontSize: 15,
                fontFamily: 'AirbnbCerealMedium',
              }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              ...styles.button,
              width: 150,
              marginVertical: 15,
              paddingHorizontal: 5,
            }}
            onTouchStart={handleRegister}>
            <Text style={{...styles.buttonText, fontSize: 15}}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    color: '#37315e',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AirbnbCerealMedium',
  },
  inputGroup: {
    padding: 5,
  },
  inputLabel: {
    // fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontFamily: 'AirbnbCerealBook',
  },
  textInput: {
    height: 40,
    backgroundColor: '#fdfdfd',
    borderRadius: 15,
    width: 300,
    paddingHorizontal: 10,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.blackish,
    width: 200,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    backgroundColor: 'transparent',
    fontFamily: 'AirbnbCerealMedium',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
  },
});

export default LoginScreen;
