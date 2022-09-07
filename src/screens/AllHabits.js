import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, } from "react-native";
import BackButton from "../components/loginBackButton";
import Header from "../components/loginHeader";
import axiosConn from "../api/config";
import CircularProgress from "../components/CircularProgress";
import AnimatedLoader from "../components/AnimatedLoader";

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
    alignItems: "center",
  },
  container2: {
    marginLeft: "8%",
    marginRight: "8%",
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

  },
  title: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
    color: "#110580",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  count: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  arrow: {
    fontSize: 32,
  },
  percent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 20,

  },
});

export default AllHabits;





































