import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, } from "react-native";
import BackButton from "../components/loginBackButton";
import Header from "../components/loginHeader";
import axiosConn from "../api/config";
import CircularProgress from "../components/CircularProgress";
import AnimatedLoader from "../components/AnimatedLoader";
import { getStatusBarHeight } from "react-native-status-bar-height";


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
    <View style={styles.container}>
      <View style={styles.container1}>
          <Image
            source={require("../assets/personalhabits.png")}
            style={styles.login}
            resizeMode="contain"
          />
        {/* <Header>Personal Habits</Header> */}
      </View>
      <View style={styles.headercontainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
  container1: {
    alignItems: "center",
    backgroundColor: "#E8E8F7",
    height: (Platform.OS === 'ios') ? 180 : 160,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: (Platform.OS === 'ios') ? "12%" : "5%",
  },
  container2: {
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "5%",
    marginTop: (Platform.OS === 'ios') ? "5%" : "2%",
  },
  item: {
    height: 100,
    width: "100%",
    backgroundColor: "#E8E8F7",
    borderRadius: 30,
    marginTop: 13,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingLeft: "1%"

  },
  title: {
    marginLeft: 13,
    fontWeight: "700",
    fontSize: 20,
    color: "#110580",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
    fontFamily: "roboto-bold"
  },
  count: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  arrow: {
    fontSize: (Platform.OS === 'ios') ? 38 : 32,
    color: "#868AE0",
    paddingRight: "2%"
  },
  percent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 20,

  },
  login: { 
    flex: 1,
    position: 'absolute',
    resizeMode: "contain",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: (Platform.OS === 'ios') ? "8%" : "2%",
  },
  headercontainer: {
    alignItems: "center"
  }
});

export default AllHabits;





































