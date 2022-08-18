import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/Dashboard";
import Icon from 'react-native-vector-icons/AntDesign'
import { StyleSheet, Text, View} from "react-native";
import UserProfile from "../screens/UserProfile";
import HabitScreen from "../screens/CreateHabit"


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={{
            headerShown:false,
            tabBarStyle:{
                backgroundColor: "white",
                borderTopWidth: 0,
                justifyContent: "center",
                alignItems: "center"
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "grey"
            }}>
            <Tab.Screen name="Home" component={DashboardScreen} options={{
                tabBarIcon:({focused, color})=>(
                    <Icon name="team" size={26} color={color}></Icon>
                ),
            }}/>
            <Tab.Screen name="Team" component={DashboardScreen} options={{
                tabBarIcon:({focused, color})=>(
                    <Icon name="team" size={26} color={color}></Icon>
                ),
            }}/>
            <Tab.Screen name="Plus" component={HabitScreen} options={{
                tabBarIcon:({focused, color})=>(
                    <Icon name="pluscircle" size={49} color={"#4E53BA"} style={{top: 0}}></Icon>
                ),
            }}/>
            <Tab.Screen name="Schedule" component={DashboardScreen} options={{
                tabBarIcon:({focused, color})=>(
                    <Icon name="calendar" size={26} color={color}></Icon>
                ),
            }}/>
            <Tab.Screen name="User" component={UserProfile} options={{
                tabBarIcon:({focused, color})=>(
                    <Icon name="user" size={26} color={color}></Icon>
                ),
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs