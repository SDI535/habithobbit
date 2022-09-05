import { Alert, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import AnimatedLoader from "../components/AnimatedLoader";

import { saveUser, getUser } from "../utils/securestore.utils";

// import { theme } from '../core/theme'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
// import Background from '../components/loginBackground'
// import Logo from '../components/loginLogo'
import Header from "../components/loginHeader";
import Button from "../components/loginButton";
import TextInput from "../components/loginTextInput";
import { TextInput as TextInputt } from "react-native-paper";
import BackButton from "../components/loginBackButton";
import { styles } from "../styles/styles";

const Login = ({ navigation }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const emailError = emailValidator(loginCredentials.email);
  const passwordError = passwordValidator(loginCredentials.password);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const {
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    erroremail,
    seterroremail,
    errorpass,
    seterrorpass,
    authcontext,
  } = useContext(AuthContext);

  twoCallsemail = (e) => {
    setLoginCredentials((prevUser) => ({ ...prevUser, email: e }));
    seterroremail({ error: "" });
  };
  twoCallspass = (e) => {
    setLoginCredentials((prevUser) => ({ ...prevUser, password: e }));
    seterrorpass({ error: "" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.registercontainer}>
        <BackButton goBack={navigation.goBack} />
        <Image
          source={require("../assets/login.png")}
          style={styles.login}
          resizeMode="contain"
        />
        <KeyboardAvoidingView
          style={styles.keyboardavoiding2}
          behavior= {(Platform.OS === 'ios')? "padding" : null}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        >
          <View style={styles.logincontainer}>
            <Header>Login</Header>
            <TextInput
              placeholder="Email"
              returnKeyType="next"
              value={loginCredentials.email}
              onChangeText={
                (value) => twoCallsemail(value)
                // setLoginCredentials((prevlogin) => ({ ...prevlogin, email: value }))
              }
              error={!!erroremail.error}
              errorText={erroremail.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              left={<TextInputt.Icon name="email" />}
            />
            <TextInput
              placeholder="Password"
              value={loginCredentials.password}
              onChangeText={
                (value) => twoCallspass(value)
                // setLoginCredentials((prevlogin) => ({...prevlogin,password: value,}))
              }
              error={!!errorpass.error}
              errorText={errorpass.error}
              left={<TextInputt.Icon name="lock" />}
              secureTextEntry={passwordVisible}
              right={
                <TextInputt.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
          </View>
        </KeyboardAvoidingView>

        <Button
          mode="contained"
          onPress={() => {
            if (emailError || passwordError) {
              seterroremail({ ...erroremail, error: emailError });
              seterrorpass({ ...errorpass, error: passwordError });
              return;
            }
            authcontext.logIn(loginCredentials);
          }}
        >
          Login
        </Button>
        <View style={styles.registerrow}>
          <Text>Don’t have an account? </Text>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Register' })}> */}
          <TouchableOpacity
            onPress={() => navigation.replace("Home", { screen: "Register" })}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? <AnimatedLoader text="Logging in..." /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
