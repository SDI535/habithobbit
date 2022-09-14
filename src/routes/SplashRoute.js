import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const SplashRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash Screen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SplashRoute;
