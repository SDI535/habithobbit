import React, { useState, useEffect } from "react";
import { View, Image, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/loginBackButton";
import Header from "../components/loginHeader";
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
        const Ongoingh = habits.filter(x => Date.parse(x.createdAt) < new Date());
        setHabits(Ongoingh);
        // const Completedh = habits.filter(x => Date.parse(x.createdAt) > new Date());
        // setHabits(Completedh);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ViewHabit", { exampleHabit: item._id })}>
      <View style={styles.percent}>
        <CircularProgress
          // percent={20}
          percent={item.currentCount / item.targetCount * 100}
          radius={25}
          textFontSize={12}
          textFontColor={'white'}
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
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Plus")}>
      <Text style={styles.title}>Start a new Habit!😊{"\n"}Create now!</Text>
      <Text style={styles.arrow}>  ❯  </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.header}>Ongoing Habits</Text>
      </View>
      <View style={styles.container2}>
        <FlatList
          data={Habits}
          renderItem={renderItem}
          keyExtractor={item => item._id}
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
  percent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 32,
    color: "#110580",
    fontFamily: "roboto-bold",
    paddingBottom: (Platform.OS === 'ios') ? "2%" : "4%",
    paddingTop: (Platform.OS === 'ios') ? "2%" : "7%",
    // paddingHorizontal: (Platform.OS === 'ios') ? 0 : "15%",
  },
});

export default OngoingHabits;





































