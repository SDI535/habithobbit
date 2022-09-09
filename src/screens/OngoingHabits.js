import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/loginBackButton";
import axiosConn from "../api/config";
import CircularProgress from "../components/CircularProgress";
import AnimatedLoader from "../components/AnimatedLoader";

const OngoingHabits = ({ navigation }) => {
  const [Habits, setHabits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = "/api/v1/habits";
    const fetchData = async () => {
      try {
        const response = await axiosConn.get(url);
        const habits = response.data.data;
        const Ongoingh = habits.filter(
          (x) => Date.parse(x.createdAt) < new Date()
        );
        setHabits(Ongoingh);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("ViewHabit", { exampleHabit: item._id })
      }
    >
      <View style={styles.percent}>
        <CircularProgress
          percent={(item.currentCount / item.targetCount) * 100}
          radius={25}
          textFontSize={12}
          textFontColor={"white"}
          textFontWeight={"normal"}
          overallbg="#FF9F6A"
          ringColor="white"
          ringBgColor="#ffc5a6"
          bgRingWidth={4}
          progressRingWidth={4}
        />
      </View>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Base", { screen: "Plus" })}
      >
        <Text style={styles.title2}>Start a new Habit!😊{"\n"}Create now!</Text>
        <Text style={styles.arrow}> ❯ </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton
          goBack={() => navigation.replace("Base", { screen: "Schedule" })}
      />
      <View style={styles.container1}>
        {/* <BackButton
          goBack={() => navigation.replace("Base", { screen: "Schedule" })}
        /> */}
        <Text style={styles.header}>Ongoing Habits</Text>
      </View>
      <View style={styles.container2}>
        <FlatList
          data={Habits}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
      {isLoading ? <AnimatedLoader text="Loading..." /> : null}
    </SafeAreaView>
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
    alignSelf: "center",
    width: "85%"
  },
  container2: {
    marginLeft: "8%",
    marginRight: "8%",
    marginTop: (Platform.OS === 'ios') ? "3%" : "2%",
    marginBottom: (Platform.OS === 'ios') ? "12%" : "25%",
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
    color: "#4E53BA",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  title2: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
    color: "#4E53BA",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
    paddingLeft: "5%"
  },
  percent: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "6%",
    paddingRight: "2%"
  },
  header: {
    fontSize: 32,
    color: "#110580",
    fontFamily: "roboto-bold",
    paddingBottom: Platform.OS === "ios" ? "2%" : "4%",
    paddingTop: Platform.OS === "ios" ? "2%" : "7%",
  },
  arrow: {
    fontSize: (Platform.OS === 'ios') ? 38 : 32,
    color: "#868AE0",
    paddingRight: "4%"
  },
});

export default OngoingHabits;
