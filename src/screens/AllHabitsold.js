import React, { useState, useEffect } from "react";
import { View, Image, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/loginBackButton";
import Header from "../components/loginHeader";
import axiosConn from "../api/config";
import CircularProgress from "../components/CircularProgress";

const DATA = [
  {
    id: "1",
    name: "Total Habits",
    arrow: "",
    color: "#868AE0",
    count: "",
  },
  {
    id: "2",
    name: "Completed Habits",
    arrow: "  ❯  ",
    color: "#78CFBD",
    count: "",
  },
  {
    id: "3",
    name: "Ongoing Habits",
    arrow: "  ❯  ",
    color: "#FF9F6A",
    count: "",
  },
];

const App = ({ navigation }) => {

  const [allHabits, setallHabits] = useState(null);
  const [onHabits, setHonabits] = useState(null);
  const [comHabits, setcomHabits] = useState(null);

  useEffect(() => {
    const url = "/api/v1/habits";
    const fetchData = async () => {
      try {
        const response = await axiosConn.get(url);
        const habits = response.data.data;
        const Ongoingh = habits.filter(x => Date.parse(x.createdAt) < new Date());
        const Completedh = habits.filter(x => Date.parse(x.createdAt) > new Date());

        const counthabits = habits.length;
        const countOngoingh = Ongoingh.length;
        const countCompletedh = Completedh.length;

        // setallHabits(habits);
        // setHonabits(Ongoingh);
        // setcomHabits(Completedh);
        // console.log("All habits: ", counthabits);
        // console.log("Ongoing habits: ", countOngoingh);
        // console.log("Completed habits: ", countCompletedh);
        console.log("Check Data 1: ", DATA);

        for (let i = 0; i < DATA.length; i++) {
          if (i = 0) {
            DATA[0].count = counthabits;
          } else if (i = 1) {
            DATA[1].count = countOngoingh;
          } else if (i = 2) {
            DATA[2].count = countCompletedh;
          }
        };

        console.log("Check Data 2: ", DATA);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const Counter = (name) => {
  //   if (name = "Total Habits") {
  //     return allHabits;
  //   } else if (name = "Completed Habits") {
  //     return onHabits;
  //   } else if (name = "Ongoing Habits") {
  //     return comHabits;
  //   }
  // };
  // const Counter = () => {
  //   return comHabits;
  // };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>     </Text>
      <View style={styles.percent} backgroundColor={item.color}>
        <Text style={styles.count}> {item.count} </Text>
      </View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.arrow}> {item.arrow}</Text>
    </View>
  );




  // placeholder={bio}
  // onChangeText={(value) => {
  //     setbio(value);
  // }}
  // value={bio}









  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Image
          source={require("../assets/personalhabits.png")}
          style={styles.login}
          resizeMode="contain"
        />
        <Header>Personal Habits</Header>
      </View>
      <View style={styles.container2}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",



  },
  container1: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
  },
  container2: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // alignItems: "center",
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "23%",
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // flexDirection: "row",
    // padding: 20,
    height: 100,
    width: "100%",
    backgroundColor: "#E8E8F7",
    borderRadius: 30,
    marginTop: 13,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",

  },
  title: {
    // fontSize: 32,
    // flex: 1,
    // width: '50%',
    // marginTop: 2,
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
    color: "#110580",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  count: {
    // fontSize: 32,
    // flex: 1,
    // width: '50%',
    // marginTop: 2,
    // marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
    color: "white",
    // flex: 1,
    // flexWrap: "wrap",
    // marginRight: 10,
    // textAlign:"center",
    // textAlignVertical: "center",
  },
  arrow: {
    fontSize: 32,
    // flex: 1,
    // width: '50%',
  },
  percent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    width: 60,
    height: 60,
    borderRadius: 20,

  },
});

export default App;





































