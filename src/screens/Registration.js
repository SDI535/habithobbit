import { Alert, SafeAreaView } from "react-native";
import React, { useState, useContext } from "react";
// import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import AnimatedLoader from "../components/AnimatedLoader";
import { AuthContext } from "../contexts/AuthContext";

// import { theme } from '../core/theme'
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
// import Background from '../components/loginBackground'
// import Logo from '../components/loginLogo'
import Header from '../components/loginHeader'
import Button from '../components/loginButton'
import TextInput from '../components/loginTextInput'
import BackButton from '../components/loginBackButton'
import { styles } from '../styles/styles'

const Registration = ({ navigation }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [erroruser, seterroruser] = useState({ error: '' })
  const [erroremail, seterroremail] = useState({ error: '' })
  const [errorpass, seterrorpass] = useState({ error: '' })

  const { isLoading, setIsLoading } = useContext(AuthContext);

  const registerUser = async () => {

    const nameError = nameValidator(user.username)
    const emailError = emailValidator(user.email)
    const passwordError = passwordValidator(user.password)
    if (emailError || passwordError || nameError) {
      seterroruser({ ...erroruser, error: nameError })
      seterroremail({ ...erroremail, error: emailError })
      seterrorpass({ ...errorpass, error: passwordError })
      return
    }

    //using Axios
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://habithobbit-server.herokuapp.com/api/v1/users",
        user
      );
      setIsLoading(false);
      if (response.status === 201) {
        Alert.alert("SUCCESS", "User created successfully", [
          {
            text: "Login",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 400) {
        Alert.alert("User already exists!");
      }
    }
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.registercontainer}>
      <BackButton goBack={navigation.goBack} />
      <Image source={require('../assets/register.png')} style={styles.register} resizeMode='contain'/>
      <View style={styles.reginputcontainer}>  
        <Header>Sign Up</Header>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          value={user.username}
          onChangeText={(value) =>
            setUser((prevUser) => ({ ...prevUser, username: value }))
          }
          error={!!erroruser.error}
          errorText={erroruser.error}
        />
        <TextInput
          placeholder="Email"
          returnKeyType="next"
          value={user.email}
          onChangeText={(value) =>
            setUser((prevUser) => ({ ...prevUser, email: value }))
          }
          error={!!erroremail.error}
          errorText={erroremail.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          returnKeyType="done"
          value={user.password}
          onChangeText={(value) =>
            setUser((prevUser) => ({ ...prevUser, password: value }))
          }
          error={!!errorpass.error}
          errorText={errorpass.error}
          secureTextEntry
        />
      </View>  
      <Button
        mode="contained"
        onPress={() => {
          registerUser();
        }}
      >
        Sign Up
      </Button>
      {/* <Button mode="text" onPress={() => navigation.navigate("Login")}>
        Login
      </Button> */}
      <View style={styles.registerrow}>
        <Text style={styles.registertext}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        {/* <TouchableOpacity onPress={() => navigation.replace('Login')}> */}
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? <AnimatedLoader text="Registering..." /> : null}
      </View>
    // </SafeAreaView>
  );
};


export default Registration;
