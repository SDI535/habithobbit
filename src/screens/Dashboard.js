import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Directions, FlatList } from "react-native-gesture-handler";
import { Avatar, Colors } from "react-native-paper";
import iconImage from "../assets/pexels-serena-koi-1576193.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import axiosConn from "../api/config";
import { getUser } from "../utils/securestore.utils";
import { AuthContext } from "../contexts/AuthContext";
import AnimatedLoader from "../components/AnimatedLoader";
import CircularProgress from "../components/CircularProgress";

const windowHeight = Dimensions.get("window").height;

const getCurrentDate = () => {
  let day = new Date().getDate();
  let month = new Date().toLocaleString("default", { month: "long" });
  let year = new Date().getFullYear();
  let result = `${day} ${month} ${year}`;
  return result;
};

const getDayName = () => {
  let array = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let d = new Date().getDay();
  let next5days = [];
  for (let i = 0; i < 6; i++) {
    if (d <= 6) {
      next5days.push(array[d]);
      d += 1;
    } else {
      d = 0;
      next5days.push(array[d]);
      d += 1;
    }
  }
  return next5days;
};

const getDayNumber = () => {
  let today = new Date();
  let now = new Date().getDate();
  let lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  let next5Dates = [];
  for (let i = 0; i < 6; i++) {
    if (now <= lastDayOfMonth) {
      next5Dates.push(now);
      now += 1;
    } else {
      now = 1;
      next5Dates.push(now);
      now += 1;
    }
  }
  return next5Dates;
};

const Dashboard = () => {
  const [userName, setUsername] = useState("Username");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [habits, setHabits] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const dayToWeekdayMapping = [
    "sun",
    "mon",
    "tues",
    "wed",
    "thurs",
    "fri",
    "sat",
  ];
  const { authcontext } = useContext(AuthContext);
  const [dayNumbers, setDayNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPress] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [counter, setCounter] = useState(1);

  const updateHabit = async (id, currentCount) => {
    const data = {
      currentCount: currentCount,
    };
    try {
      const url = `/api/v1/habits/${id}`;
      const response = await axiosConn.put(url, data);
      setRefresh(!refresh);
      setCounter(counter + 1);
      // console.log("results are", response.data.data.currentCount);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onPress = async (id, currentCount) => {
    setRefresh(!refresh);
    // console.log("current count is ", currentCount);
    if (selectedId.indexOf(id) == -1) {
      const inputtedValue = id;
      const newList = [];
      newList.push(inputtedValue);
      const updatedList = [...newList, ...selectedId];
      // console.log("updatedList", updatedList)
      setSelectedId(updatedList);
      const updatedCount = currentCount + 1;
      await updateHabit(id, updatedCount);
      // console.log("addition updated count", updatedCount)
    } else {
      const newList = selectedId;
      newList.splice(newList.indexOf(id), 1);
      // console.log("new List", newList)
      setSelectedId(newList);
      const updatedCount = currentCount - 1;
      await updateHabit(id, updatedCount);
      // console.log("subtraction updated count", updatedCount)
    }
  };

  const updateSelectedDay = (value) => {
    // console.log("enter here: ", value);
    setSelectedDay(value);
  };

  useEffect(() => {
    let d = new Date().getDay();
    let dayArray = [];
    for (let i = 0; i < 6; i++) {
      if (d <= 6) {
        dayArray.push(d);
        d += 1;
      } else {
        d = 0;
        dayArray.push(d);
        d += 1;
      }
    }
    setDayNumbers(dayArray);
  }, []);

  useEffect(() => {
    const url = "/api/v1/users/profile";
    const fetchData = async () => {
      try {
        const response = await axiosConn.get(url);
        const username = response.data.data.username; //Did not use getUser since it returns a promise on console log
        const avatarUrl = response.data.data.avatarUrl;
        setUsername(username);
        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("this runs");
    setIsLoading(true);
    const url = "/api/v1/habits";
    const fetchData = async () => {
      try {
        const response = await axiosConn.get(url);
        const habits = response.data.data;
        const day = dayToWeekdayMapping[selectedDay];
        // console.log(day);
        const arrayOfHabits = [];
        habits.forEach((x) => {
          let frequency = x.frequency[0];
          let arrayOfObjects = Object.entries(frequency);

          arrayOfObjects.forEach((y) => {
            let habitObj = {};
            if (y[0] === day) {
              if (y[1] === true) {
                // console.log(
                //   "current count retrieved from db is ",
                //   x.currentCount
                // );
                (habitObj.name = x.name),
                  ((habitObj.id = x._id),
                  (habitObj.currentCount = x.currentCount),
                  (habitObj.targetCount = x.targetCount));
                arrayOfHabits.push(habitObj);
              }
            }
          });
        });
        setHabits(arrayOfHabits);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedDay, counter]);

  // console.log("day:", selectedDay);
  // console.log(habits);

  const renderItem = ({ item }) => {
    let backgroundColor;
    let tickColor;
    // console.log("index", selectedId.indexOf(item.id));
    if (selectedId.indexOf(item.id) == -1 || selectedDay!=dayNumbers[0]) {
      backgroundColor = "#E8E8F7";
      tickColor = "#FFFFFF";
    } else {
      backgroundColor = "#E9E9E9";
      tickColor = "#27D24C";
    }

    return (
      <TouchableOpacity
        disabled={selectedDay==dayNumbers[0] ? false : true}
        style={[styles.habitsContainer, { backgroundColor: backgroundColor }]}
        key={item.id}
        onPress={() => {
          onPress(item.id, item.currentCount);
        }}
      >
        <View style={styles.percent}>
          <CircularProgress
            // percent={20}
            percent={Math.round((item.currentCount / item.targetCount) * 100)}
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
        <Text style={styles.username}> {item.name} </Text>
        <View style={styles.tick}>
          <MaterialIcon
            name="checkbox-marked-circle"
            size={30}
            color={tickColor}
          ></MaterialIcon>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={[styles.margin]}>
        <View style={styles.container}>
          {/* <Avatar.Image size={64} source={{ uri: avatarUrl }}></Avatar.Image> */}

          {avatarUrl ? (
            <Avatar.Image size={64} source={{ uri: avatarUrl }} />
          ) : (
            <Avatar.Icon style={styles.profilepic} size={64} icon="account" />
          )}

          <View style={styles.container2}>
            <Text style={styles.welcome}> WELCOME!</Text>
            <Text style={styles.username}> {userName} </Text>
          </View>
          <View style={styles.exitContainer}>
            <MaterialIcon
              style={styles.exit}
              name="location-exit"
              size={30}
              color="#4E53BA"
              onPress={() => authcontext.logOut()}
            ></MaterialIcon>
          </View>
        </View>
        <View>
          <Text style={styles.date}>{getCurrentDate()}</Text>
        </View>
        <View style={styles.container3}>
          <View style={styles.box1}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[0] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[0])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[0]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[0]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[0]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[0]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[1] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[1])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[1]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[1]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[1]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[1]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[2] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[2])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[2]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[2]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[2]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[2]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[3] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[3])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[3]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[3]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[3]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[3]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[4] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[4])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[4]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[4]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[4]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[4]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity
              style={[
                styles.button,
                ,
                {
                  backgroundColor:
                    selectedDay === dayNumbers[5] ? "#868AE0" : "transparent",
                },
              ]}
              onPress={() => updateSelectedDay(dayNumbers[5])}
            >
              <Text
                style={
                  selectedDay === dayNumbers[5]
                    ? styles.selectedGeneralFontTitle
                    : styles.generalFontTitle
                }
              >
                {" "}
                {getDayName()[5]}{" "}
              </Text>
              <Text
                style={
                  selectedDay === dayNumbers[5]
                    ? styles.selectedGeneralFont
                    : styles.generalFont
                }
              >
                {" "}
                {getDayNumber()[5]}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.personalHabits}>Personal Habits </Text>
        <View style={styles.scrollableContainer}>
          {/* <ScrollView> */}
          <View style={styles.flatListStuff}>
            <FlatList
              data={habits}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={[refresh]}
            ></FlatList>
            {/* <View style={styles.emptyBox}/> */}
          </View>
          <View style={styles.emptyBox} />
          {/* {habits.map((x) => {
              return (
                <TouchableOpacity style={[styles.habitsContainer,{backgroundColor: isPressed == false ? "#E8E8F7": "#E9E9E9"}]} key={x.id} onPress={onPress}>
                  <View style={styles.percent}>
                    <CircularProgress
                      // percent={20}
                      percent={x.currentCount / x.targetCount * 100}
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
                  <Text style={styles.username}> {x.name} </Text>
                  <View style={styles.tick}>
                    <MaterialIcon name="checkbox-marked-circle" size={30} color="#FFFFFF"></MaterialIcon>
                  </View>
                </TouchableOpacity>
              );
            })} */}
          {/* </ScrollView> */}
        </View>
      </View>
      {isLoading ? <AnimatedLoader text="Loading..." /> : null}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  habitIcon: {
    height: 60,
    width: 60,
    marginLeft: 20,
    backgroundColor: "#868AE0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListStuff: {
    maxHeight: windowHeight / 1.5,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // marginTop: "5%",
    marginBottom: "1%",
  },
  percent: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 10,
    // paddingHorizontal: 10,
    paddingLeft: "6%",
    paddingRight: "2%",
  },
  tick: {
    marginRight: 20,
  },
  habitsContainer: {
    height: 100,
    width: "100%",
    borderRadius: 30,
    marginTop: 13,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  scrollableContainer: {
    height: "71%",
    paddingTop: Platform.OS === "ios" ? "5%" : 0,
  },
  generalFontTitle: {
    color: "#4E53BA",
    fontWeight: "300",
  },
  generalFont: {
    color: "#4E53BA",
    fontWeight: "500",
  },
  selectedGeneralFontTitle: {
    color: "#ffffff",
    fontWeight: "300",
  },
  selectedGeneralFont: {
    color: "#ffffff",
    fontWeight: "500",
  },
  button: {
    margin: "5%",
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4E53BA",
    borderWidth: 1,
  },
  box1: {
    flex: 1,
    width: "25%",
    justifyContent: "center",
  },
  box2: {
    width: "15%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    height: 64,
    flexDirection: "row",
  },
  container2: {
    flexDirection: "column",
    height: 64,
  },
  container3: {
    marginTop: 13,
    flexDirection: "row",
    height: 65,
  },
  date: {
    marginTop: 20,
    fontWeight: "400",
    fontFamily: "roboto-regular",
    fontSize: 12,
    color: "#4E53BA",
  },
  welcome: {
    marginTop: 10,
    marginLeft: 10,
    fontFamily: "roboto-regular",
    fontSize: 16,
    fontWeight: "200",
    color: "#868AE0",
  },
  username: {
    marginTop: 2,
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 20,
    color: "#110580",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 10,
  },
  exitContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  personalHabits: {
    fontWeight: "700",
    fontSize: 20,
    color: "#110580",
    marginTop: 18,
  },
  margin: {
    marginTop: "15%",
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "15%",
  },
  emptyBox: {
    width: "100%",
    height: Platform.OS === "ios" ? 0 : "13%",
    backgroundColor: "white",
  },
});
