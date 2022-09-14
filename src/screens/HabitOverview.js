import { View, Text } from "react-native";
import React, { useEffect } from "react";
import axiosConn from "../api/config";

import axios from "axios";
import Button from '../components/loginButton'
import { getUser } from "../utils/securestore.utils";
import * as SecureStore from "expo-secure-store";

// const HabitOverview = () => {
//   const url = "/api/v1/habits";
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosConn.get(url);
//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <View>
//       <Text>HabitOverview</Text>
//     </View>
//   );
// };







const HabitOverview = () => {

  const Habit = async () => {

    const token = await SecureStore.getItemAsync("user");
    console.log(token);

    try {
      const response = await axios.get(
        "https://habithobbit-server.herokuapp.com/api/v1/habits", {
        headers: {
          'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjc1OWFhYzJmYWE0MmM3N2ZiMGI3NyIsImlhdCI6MTY2MDUyMDE5MSwiZXhwIjoxNjYzMTEyMTkxfQ.ycq1VWf7gXoWqsgOyxFL7_nriIseKwaNXCr5lJcthTw"}`
        }
      });
      let userData = response.data.data;
      console.log((userData));
    } catch (error) {
      console.error(error)
    };
  }

  return (
    <View>
      <Text>"HabitOverview"</Text>
      <Button
        mode="contained"
        onPress={() => {
          Habit();
        }}
      >
        Start
      </Button>
    </View>
  );
}

export default HabitOverview;


