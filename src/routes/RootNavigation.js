import React, { useContext, useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { getUser } from "../utils/securestore.utils";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "../hooks/useFonts";
import DashboardTab from "./DashboardTab"

SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [checking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const user = await getUser();
      if (user !== null) {
        setIsLoggedIn(true);
      }
      setIsChecking(false);
    };
    checkIfUserIsLoggedIn();
  }, []);

  useEffect(() => {
    const prepare = async () => {
      try {
        await useFonts();
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (setAppIsReady && !checking) {
      await SplashScreen.hideAsync();
    }
  }, [setAppIsReady, checking]);

  if (!appIsReady || checking) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {isLoggedIn ? <DashboardTab /> : <PublicRoute />}
    </NavigationContainer>
  );
};

export default RootNavigation;
