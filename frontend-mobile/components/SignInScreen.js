import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import logo from '../assets/images/logo.jpeg';
import CustomInput from './CustomInput/CustomInput';
import CustomButton from './CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';

function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const navigation = useNavigation();

  // Redux
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  
  useEffect(() => {
    if (isError) {
      console.warn(message)
      //toast.error(message)
    }

    console.log("user in signIn is: " + user)

    if (isSuccess || user) {
      navigation.replace('Home');
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigation, dispatch])

  const onSignInPress = (e) => {
    //console.warn("Sign in")
    e.preventDefault()

    const userData = {
      email: username,
      password,
    }

    dispatch(login(userData))
  }

  
  return (
    <View style={styles.root}>
      <Image 
        source={logo} 
        style={[styles.logo, {height: height * 0.3}]} 
        resizeMode="contain"  
      />

      <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername}
      />
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword}
        secureTextEntry
      />

      <CustomButton text="Sign In" onPress={onSignInPress} />
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: '45%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;