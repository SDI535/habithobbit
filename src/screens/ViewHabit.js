import { useState, useEffect, useCallback } from "react";
import { Alert, Text, TouchableOpacity, View, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/styles";
import BackButton from "../components/loginBackButton";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axiosConn from "../api/config";
import React from "react";
import Moment from "react-moment";
import moment from "moment";
import AnimatedLoader from "../components/AnimatedLoader";
import { IconButton, Modal, Portal, Provider } from "react-native-paper";
import Button from "../components/loginButton";
import { EditHabit } from "./EditHabit";

const ViewHabit = ({ route, navigation }) => {
  const { isUpdated } = route.params;
  //console.log("view habit", isUpdated);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [habitDesc, setHabitDesc] = useState(
    "Default description example description example"
  );
  const [freq, setFreq] = useState("Daily");
  const [endDate, setEndDate] = useState("21 May 2023");
  const [privacy, setPrivacy] = useState("Private");
  const [habitName, setHabitName] = useState("Sleep more");
  const [dates, setDates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [masterHabit, setMasterHabit] = useState({});
  const [updated, setUpdated] = useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "95%",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
  };

  // listOfDates.forEach((day) => {
  //     newDaysObject[day] = {
  //         selected: true, selectedColor: "#E8E8F7"
  //     }
  // })

  // const exampleHabit = '62fc6d14996aca158ce458b2' //To be replaced with props passed in
  const { exampleHabit } = route.params;

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const url = `/api/v1/habits/${exampleHabit}`;
      const fetchData = async () => {
        try {
          const response = await axiosConn.get(url);
          const endDate = response.data.data.endDate;
          setMasterHabit(response.data.data);
          setHabitDesc(response.data.data.description);
          setHabitName(response.data.data.name);
          setIsLoading(false);
          if (response.data.data.private == false) {
            setPrivacy("Public");
          } else {
            setPrivacy("Private");
          }
          setEndDate(moment(endDate).local().format("YYYY-MM-DD"));
          const createdAt = response.data.data.createdAt;
          const frequency = response.data.data.frequency;
          setFreq(frequency[0].repeat);
          if (frequency[0].repeat == "daily") {
            let current = new Date(createdAt);
            let end = new Date(endDate);
            let listOfDates = [];
            listOfDates.push(moment(createdAt).local().format("YYYY-MM-DD"));
            while (current <= end) {
              current.setDate(current.getDate() + 1);
              listOfDates.push(moment(current).local().format("YYYY-MM-DD"));
            }
            let newDaysObject = {};
            listOfDates.forEach((day) => {
              newDaysObject[day] = {
                selected: true,
                selectedColor: "#E8E8F7",
              };
            });
            setDates(newDaysObject);
          } else if (frequency[0].repeat == "weekly") {
            let current = new Date(createdAt);
            let end = new Date(endDate);
            let listOfDates = [];
            let newDaysObject = {};
            if (frequency[0].mon == true) {
              let output = datesCalculation(1, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].tues == true) {
              let output = datesCalculation(2, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].wed == true) {
              let output = datesCalculation(3, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].thurs == true) {
              let output = datesCalculation(4, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].fri == true) {
              let output = datesCalculation(5, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].sat == true) {
              let output = datesCalculation(6, current, end);
              listOfDates = listOfDates.concat(output);
            }
            if (frequency[0].sun == true) {
              let output = datesCalculation(0, current, end);
              listOfDates = listOfDates.concat(output);
            }
            listOfDates.forEach((day) => {
              newDaysObject[day] = {
                selected: true,
                selectedColor: "#E8E8F7",
              };
            });
            setDates(newDaysObject);
          }
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (route.params.isUpdated) {
      //setUpdated((prev) => {prev + 1})
      setHabitName(isUpdated.name);
    }
  }, [route.params.isUpdated]);

  const datesCalculation = (weekday, current, end) => {
    let calculatedDates = [];
    let upcomingDay = new Date(current);
    upcomingDay.setDate(
      current.getDate() + ((((7 - current.getDay()) % 7) + weekday) % 7)
    );
    while (upcomingDay <= end) {
      calculatedDates.push(moment(upcomingDay).local().format("YYYY-MM-DD"));
      upcomingDay.setDate(upcomingDay.getDate() + 7);
    }
    return calculatedDates;
  };

  const deleteHabit = async () => {
    const endPoint = `/api/v1/habits/${exampleHabit}`;
    try {
      const response = await axiosConn.delete(endPoint);
      if (response) {
        Alert.alert("SUCCESS", "Habit deleted", [
          {
            text: "Ok",
            onPress: () => {
              navigation.replace("Base", { screen: "Home" });
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider>
      <View style={styles.habitcontainer}>
        <BackButton goBack={navigation.goBack} />
        <TouchableOpacity style={styles.trashcan} onPress={showModal}>
          <FontAwesome name="trash-o" size={20}></FontAwesome>
        </TouchableOpacity>
        <View style={styles.viewHabit}>
          <Text style={styles.topHeader}>{habitName}</Text>
          <TouchableOpacity style={{ marginLeft: "3%" }}>
            <AntDesign
              name="edit"
              size={20}
              style={{ marginLeft: "3%" }}
              onPress={() => {
                navigation.navigate("EditHabit", {
                  masterHabit: masterHabit,
                });
              }}
            ></AntDesign>
          </TouchableOpacity>
        </View>
        <Calendar
          style={{
            width: 300,
            marginLeft: "5%",
            marginRight: "5%",
            borderColor: "#878585",
            borderWidth: 1,
            borderRadius: 20,
            minHeight: 320,
          }}
          markedDates={dates}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            selectedDayTextColor: "#110580",
            todayTextColor: "#110580",
            arrowColor: "#110580",
            monthTextColor: "#110580",
            textMonthFontWeight: "bold",
          }}
        />
        <Text style={[styles.viewHabitTitle, { marginTop: "5%" }]}>
          Habit Description
        </Text>
        <Text style={styles.viewHabitDescription}> {habitDesc} </Text>
        <Text style={styles.viewHabitTitle}>Frequency</Text>
        <Text style={styles.viewHabitDescription}> {freq} </Text>
        <Text style={styles.viewHabitTitle}>End Date</Text>
        <Text style={styles.viewHabitDescription}> {endDate} </Text>
        <Text style={styles.viewHabitTitle}>Habit Privacy</Text>
        <Text style={styles.viewHabitDescription}> {privacy} </Text>
        {isLoading ? <AnimatedLoader text="Loading..." /> : null}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Image source={require("../assets/Wait.png")} />
            <Text style={styles.popheader}>W...Wait!</Text>
            <Text style={styles.popTxt}>
              Are you sure you want to delete this habits?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button style={styles.buttonNot} onPress={hideModal}>
                Nahh
              </Button>
              <Button style={styles.buttonYes} onPress={() => deleteHabit()}>
                Sure!
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default ViewHabit;
