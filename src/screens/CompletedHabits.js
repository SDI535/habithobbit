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

const CompletedHabits = ({ navigation }) => {
  const [Habits, setHabits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = "/api/v1/habits";
    const fetchData = async () => {
      try {
        console.log("this is fetched")
        const response = await axiosConn.get(url);
        const habits = response.data.data;
        const Completedh = habits.filter(
          (x) => {
            // console.log("created at",x.createdAt);
            // console.log("end date", x.endDate);
            return (
              // console.log("Parsed date", Date.parse(x.createdAt));
              Date.parse(x.endDate) <= new Date()
            )
          }
        );
        setHabits(Completedh);
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
          overallbg="#78CFBD"
          ringColor="white"
          ringBgColor="#b2ffda"
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
        <Text style={styles.title}>
          Nothing yet... 😔{"\n"}Create another Habits?
        </Text>
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
        <Text style={styles.header}>Completed Habits</Text>
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
    marginBottom: "23%",
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
    fontSize: 18,
    color: "#110580",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
    paddingLeft: "5%"
  },
  percent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
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

export default CompletedHabits;
