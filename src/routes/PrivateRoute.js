import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/Dashboard";
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";
import CreateHabit from "../screens/CreateHabit";
import HabitsActivityFeed from "../screens/HabitsActivityFeed";
import UserProfile from "../screens/UserProfile";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="home" size={26} color={color}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Team"

        component={HabitsActivityFeed}

        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="team" size={26} color={color}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={CreateHabit}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="pluscircle"
              size={49}
              color={"#4E53BA"}
              style={{ top: 0 }}
            ></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon name="calendar" size={26} color={color}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="User"

        component={UserProfile}
        options={{
          tabBarStyle: { display: 'none' },

          tabBarIcon: ({ focused, color }) => (
            <Icon name="user" size={26} color={color}></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};



const PrivateRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Base"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Base" component={Tabs} />
    </Stack.Navigator>
  );
};

export default PrivateRoute;

