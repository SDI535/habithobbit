import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "../screens/Registration";
import Login from "../screens/Login";

import Welcome from "../screens/Welcome";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName='Welcome'
      tabBar={() => null}
    // tabBarOptions={{
    //   tabStyle: {height: 0},
    //   style: {backgroundColor: 'transparent'}
    // }}
    >
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="Onboarding1" component={Onboarding1} />
      <Tab.Screen name="Onboarding2" component={Onboarding2} />
      <Tab.Screen name="Onboarding3" component={Onboarding3} />
      <Tab.Screen name="Register" component={Registration} />
    </Tab.Navigator>
  );
}

const PublicRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default PublicRoute;
