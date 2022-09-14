import {
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  Animated,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { styles } from "../styles/styles";
import axiosConn from "../api/config";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  TextInput,
} from "react-native-paper";
import moment from "moment";
import { getUser } from "../utils/securestore.utils";
import { AuthContext } from "../contexts/AuthContext";
import AnimatedLoader from "../components/AnimatedLoader";

const HabitsActivityFeed = () => {
  const [publicHabits, setPublicHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [refreshingFlatList, setRefreshingFlatList] = useState(false);

  useEffect(() => {
    const getUserFromSStore = async () => {
      const user = await getUser();
      setLoginUser(JSON.parse(user));
    };
    getUserFromSStore();
  }, []);

  useEffect(() => {
    fetchPublicHabits();
  }, [currentPage]);

  //for refreshing flat List
  useEffect(() => {
    if (refreshingFlatList) {
      setCurrentPage(0);
      fetchPublicHabits();
      setRefreshingFlatList(false);
    }
  }, [refreshingFlatList]);

  const fetchPublicHabits = async () => {
    const endPoint = `/api/v1/habits/public/?p=${currentPage}`;
    if (currentPage > 0) {
      try {
        setIsLoading(true);
        const response = await axiosConn.get(endPoint);
        setPublicHabits((prev) => [...prev, ...response.data.data]);
        setFilteredHabits((prev) => [...prev, ...response.data.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await axiosConn.get(endPoint);
        setPublicHabits(response.data.data);
        setFilteredHabits(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  //search Habit
  const searchHabits = (text) => {
    if (text) {
      const filteredPublicHabits = publicHabits.filter((habit) => {
        const habitNameInUpper = `${habit.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return habitNameInUpper.indexOf(textData) > -1;
      });
      setFilteredHabits(filteredPublicHabits);
      setSearchText(text);
    } else {
      setFilteredHabits(publicHabits);
      setSearchText(text);
    }
  };

  const loadMoreHabits = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const unlikeHabit = async (habitId) => {
    const endPoint = `/api/v1/habits/${habitId}/unlike`;
    try {
      const response = await axiosConn.put(endPoint);
      if (response) {
        const updatedHabit = response.data.data;

        const result = publicHabits.map((habit) =>
          habit._id === updatedHabit._id ? updatedHabit : habit
        );

        setPublicHabits(result);
        setFilteredHabits(result);

        setIsLikePressed((prev) => !prev);
        // Alert.alert("You unlike a habit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //if user loads more, page = 1, scrollback to 0 and like a post, mongoDB is updated and should
  //update existing publichabit.likes with the loginUserID

  const likeHabit = async (habitId) => {
    const endPoint = `/api/v1/habits/${habitId}/like`;
    try {
      const response = await axiosConn.put(endPoint);
      if (response) {
        const updatedHabit = response.data.data;
        const result = publicHabits.map((habit) =>
          habit._id === updatedHabit._id ? updatedHabit : habit
        );

        setPublicHabits(result);
        setFilteredHabits(result);

        setIsLikePressed((prev) => !prev);
        // Alert.alert("You like a habit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Each habit card
  const habitComponent = ({ item }) => {
    const habitId = item._id;
    const loginUserId = loginUser.id;
    const avatarUrl = item.user.avatarUrl;
    const likes = item.likes;
    const likesCount = likes.length;
    let daysFromNow = moment(item.createdAt).fromNow();

    return (
      <View
        key={item._id}
        style={{
          backgroundColor: "#E8E8F7",
          marginBottom: 20,
          padding: 20,
          borderRadius: 30,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", paddingLeft: "1%"}}>
          {avatarUrl ? (
            <Avatar.Image size={40} source={{ uri: avatarUrl }} />
          ) : (
            <Avatar.Icon
              size={40}
              icon="account-outline"
              color="#ffffff"
              style={{ backgroundColor: "#868AE0"}}
            />
          )}

          <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: "2.5%" }}>
            <Text style={{ color: "#4E53BA", fontSize: 18, lineHeight: 16 }}>
              {item.user.username}
              {loginUserId === item.user._id ? " (You)" : null}
            </Text>
            <Text
              style={{
                color: "#4E53BA",
                fontSize: 8,
                lineHeight: 16,
                fontFamily: "roboto-light",
              }}
            >{`created ${daysFromNow}`}</Text>
          </View>
          <View style={{marginTop: "-2%"}}>
            {item.likes.includes(loginUserId) ? (
              <IconButton
                size={24}
                icon="heart"
                color="red"
                animated={true}
                rippleColor="rgba(255,0,0,0.5)"
                onPress={() => unlikeHabit(habitId)}
              />
            ) : (
              <IconButton
                size={24}
                icon="heart-outline"
                color="#000000"
                rippleColor="rgba(255,0,0,0.5)"
                onPress={() => likeHabit(habitId)}
              />
            )}
            <Text
              style={{
                color: "#4E53BA",
                fontSize: 10,
                lineHeight: 16,
                fontFamily: "roboto-medium",
                marginTop: "90%",
                marginLeft: "20%",
                position: "absolute",
              }}
            >{`${likesCount} likes`}</Text>
          </View>
        </View>
        <View style={{ flex: 1, paddingLeft: "2%", paddingTop: "6%" }}>
          <Text
            numberOfLines={1}
            style={{
              color: "#4E53BA",
              fontSize: 20,
              lineHeight: 20,
              fontFamily: "roboto-bold",
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          width: "100%",
          height: 250,
          alignItems: "stretch",
          paddingHorizontal: 30,
          marginTop: (Platform.OS === 'ios') ? 0 : "8%"
        }}
      >
        {showSearchBar ? (
          <TextInput
            style={{ 
              width: "90%", 
              backgroundColor: "transparent",
              height:(Platform.OS === 'ios') ? 0 : 25,
              paddingTop: (Platform.OS === 'ios') ? 0 : "2%",
              paddingBottom: (Platform.OS === 'ios') ? 0 : "10%",
              
            }}
            mode="outlined"
            theme={{roundness:50}}
            placeholder="Search habit..."
            outlineColor="#878585"
            activeOutlineColor="#110580"
            dense={true}
            value={searchText}
            onChangeText={(searchText) => {
              searchHabits(searchText);
            }}
          />
        ) : null}
        <IconButton
          style={{ position: "absolute", right: 0 }}
          icon="magnify"
          color="#878585"
          size={30}
          onPress={() => {
            setShowSearchBar((prev) => !prev);
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "roboto-bold",
          fontSize: 32,
          color: "#110580",
          alignSelf: "center",
          paddingTop: (Platform.OS === 'ios') ? "5%" : "8%"
        }}
      >
        Activity Feed{" "}
      </Text>

      <View style={{ flex: 10, width: "100%", padding: 30 }}>
        <FlatList
          style={{}}
          data={filteredHabits}
          renderItem={habitComponent}
          onEndReached={loadMoreHabits}
          onEndReachedThreshold={0}
          refreshing={refreshingFlatList}
          onRefresh={() => setRefreshingFlatList(true)}
        />
        {isLoading ? <AnimatedLoader /> : null}
      </View>
    </SafeAreaView>
  );
};

export default HabitsActivityFeed;
