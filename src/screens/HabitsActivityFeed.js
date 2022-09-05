import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import axiosConn from "../api/config";
import { Avatar, IconButton } from "react-native-paper";
import { DateTime, Interval } from "luxon";
import { getUser } from "../utils/securestore.utils";

const HabitsActivityFeed = () => {
  const [publicHabits, setPublicHabits] = useState([]);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    const endPoint = "/api/v1/habits/public";
    const fetchData = async () => {
      try {
        const result = await getUser();
        setLoginUser(JSON.parse(result));
        const response = await axiosConn.get(endPoint);
        setPublicHabits(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [isLikePressed]);

  const unlikeHabit = async (habitId) => {
    const endPoint = `/api/v1/habits/${habitId}/unlike`;
    try {
      const response = await axiosConn.put(endPoint);
      if (response) {
        setIsLikePressed((prev) => !prev);
        Alert.alert("You unlike a habit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeHabit = async (habitId) => {
    const endPoint = `/api/v1/habits/${habitId}/like`;
    try {
      const response = await axiosConn.put(endPoint);
      if (response) {
        setIsLikePressed((prev) => !prev);
        Alert.alert("You like a habit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HabitComponent = publicHabits.map((habit) => {
    console.log(habit);
    const habitId = habit._id;
    const loginUserId = loginUser.id;
    console.log(loginUserId);
    const avatarUrl = habit.user.avatarUrl;
    const likes = habit.likes;
    const likesCount = likes.length;
    const createdDate = DateTime.fromISO(habit.createdAt);
    const now = DateTime.now();
    let i = Interval.fromDateTimes(createdDate, now);
    let daysFromNow = i.count("days");

    return (
      <View key={habitId}>
        <Avatar.Image size={40} source={{ uri: avatarUrl }} />
        <Text>{habit.user.username}</Text>
        <Text>{habit.name}</Text>

        {habit.likes.includes(loginUserId) ? (
          <IconButton
            size={22}
            icon="heart"
            color="red"
            onPress={() => unlikeHabit(habitId)}
          />
        ) : (
          <IconButton
            size={22}
            icon="heart-outline"
            color="#000000"
            onPress={() => likeHabit(habitId)}
          />
        )}

        <Text>{`created ${daysFromNow} days ago`}</Text>
        <Text>{`${likesCount} likes`}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView>
      <Text style={styles.headerTxt}>Activity Feed </Text>
      {HabitComponent}
    </SafeAreaView>
  );
};

export default HabitsActivityFeed;
