import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from '../components/loginButton'
import { AuthContext } from "../contexts/AuthContext";
import { removeUser } from "../utils/securestore.utils";
import Header from '../components/loginHeader'

const Dashboard = (navigation) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    await removeUser();
    setIsLoggedIn(false);
  };

  return (
    <View>
      <Header>Dashboard</Header>
      <Button
        mode="contained"
        onPress={() => {
          logout();
        }}
      >
        Log Out
      </Button>

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate({ screen: 'PersonalHabit' })
          }}
        >Personal Habit</Button>

    </View>
  );
};

export default Dashboard;