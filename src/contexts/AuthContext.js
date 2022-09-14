import React, { useState } from "react";
import {
  saveUser,
  getUser,
  removeUser,
  saveToken,
  removeToken,
  getToken,
} from "../utils/securestore.utils";
import { Alert } from "react-native";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erroremail, seterroremail] = useState({ error: "" });
  const [errorpass, seterrorpass] = useState({ error: "" });

  const authcontext = React.useMemo(() => ({
    logIn: async (loginCredentials, emailError, passwordError) => {
      if (emailError || passwordError) {
        seterroremail({ ...erroremail, error: emailError });
        seterrorpass({ ...errorpass, error: passwordError });
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://habithobbit-server.onrender.com/api/v1/users/login",
          loginCredentials
        );
        console.log(response);
        let userData = response.data.data;
        let token = response.data.token;
        saveUser(JSON.stringify(userData));
        saveToken(JSON.stringify(token));
        setIsLoggedIn(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsLoggedIn(false);
        Alert.alert(`${error.response.data.message}`);
      }
    },
    logOut: async () => {
      await removeToken();
      setIsLoggedIn(false);
    },
    register: () => {},
  }));

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        erroremail,
        seterroremail,
        errorpass,
        seterrorpass,
        authcontext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
