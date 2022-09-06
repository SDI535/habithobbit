import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, } from "react-native";
import BackButton from "../components/loginBackButton";
import Header from "../components/loginHeader";
import axiosConn from "../api/config";
import CircularProgress from "../components/CircularProgress";
import AnimatedLoader from "../components/AnimatedLoader";

// const DATA = [
//   {
//     id: "1",
//     name: "Total Habits",
//     arrow: "",
//     color: "#868AE0",
//     count: "",
//   },
//   {
//     id: "2",
//     name: "Completed Habits",
//     arrow: "  ❯  ",
//     color: "#78CFBD",
//     count: "",
//   },
//   {
//     id: "3",
//     name: "Ongoing Habits",
//     arrow: "  ❯  ",
//     color: "#FF9F6A",
//     count: "",
//   },
// ];

const AllHabits = ({ navigation }) => {

  const [allHabits, setallHabits] = useState(null);
  const [onHabits, setHonabits] = useState(null);
  const [comHabits, setcomHabits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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

        setallHabits(counthabits);
        setHonabits(countOngoingh);
        setcomHabits(countCompletedh);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      <ScrollView>
        <View style={styles.container2}>
          <View style={styles.item}>
            <Text>     </Text>
            <View style={styles.percent} backgroundColor={"#868AE0"}>
              <Text style={styles.count}> {allHabits} </Text>
            </View>
            <Text style={styles.title}>Total Habits</Text>
          </View>
          <TouchableOpacity style={styles.item} onPress={() => navigation.replace("CompletedHabits")}>
            <Text>     </Text>
            <View style={styles.percent} backgroundColor={"#78CFBD"}>
              <Text style={styles.count}> {comHabits} </Text>
            </View>
            <Text style={styles.title}>Completed Habits</Text>
            <Text style={styles.arrow}>  ❯  </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => navigation.replace("OngoingHabits")}>
            <Text>     </Text>
            <View style={styles.percent} backgroundColor={"#FF9F6A"}>
              <Text style={styles.count}>{onHabits}</Text>
            </View>
            <Text style={styles.title}>Ongoing Habits</Text>
            <Text style={styles.arrow}>  ❯  </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <AnimatedLoader text="Loading..." /> : null}
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
    // marginBottom: "23%",
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

export default AllHabits;





































