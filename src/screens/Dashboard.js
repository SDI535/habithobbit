import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Directions } from "react-native-gesture-handler";
import { Avatar, Colors } from "react-native-paper";
import iconImage from '../assets/pexels-serena-koi-1576193.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

const getCurrentDate = () => {
    let day = new Date().getDate();
    let month = new Date().toLocaleString('default', { month: 'long' });
    let year = new Date().getFullYear();
    let result = `${day} ${month} ${year}`
    return result
}

const getDayName = () => {
    let array = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    let d = new Date().getDay();
    let next5days = []
    for (let i = 0; i < 6; i++) {
        if (d <= 6) {
            next5days.push(array[d]);
            d += 1;
        } else {
            d = 0
            next5days.push(array[d]);
            d += 1;
        }
    }
    return next5days;
}

const getDayNumber = () => {
    let today = new Date();
    let now = new Date().getDate();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let next5Dates = [];
    for (let i = 0; i < 6; i++) {
        if (now <= lastDayOfMonth) {
            next5Dates.push(now);
            now += 1;
        } else {
            now = 1
            next5Dates.push(now);
            now += 1;
        }
    }
    return next5Dates
}

const Dashboard = () => {
    return (
        <View style={{backgroundColor:"white"}}>
            <View style={[styles.margin]}>
                <View style={styles.container}>
                    <Avatar.Image size={64} source={iconImage}></Avatar.Image>
                    <View style={styles.container2}>
                        <Text style={styles.welcome}> WELCOME!</Text>
                        <Text style={styles.username}> Username </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.date}>{getCurrentDate()}</Text>
                </View>
                <View style={styles.container3}>
                    <View style={styles.box1}>
                        <TouchableOpacity style={[styles.button, , { backgroundColor: "#868AE0" }]}>
                            <Text style={[{ color: "#FFFFFF" }, { fontWeight: "300" }]}> {getDayName()[0]} </Text>
                            <Text style={[{ color: "#FFFFFF" }, { fontWeight: "500" }]}> {getDayNumber()[0]} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.generalFontTitle}> {getDayName()[1]} </Text>
                            <Text style={styles.generalFont}> {getDayNumber()[1]} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.generalFontTitle}> {getDayName()[2]} </Text>
                            <Text style={styles.generalFont}> {getDayNumber()[2]} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.generalFontTitle}> {getDayName()[3]} </Text>
                            <Text style={styles.generalFont}> {getDayNumber()[3]} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.generalFontTitle}> {getDayName()[4]} </Text>
                            <Text style={styles.generalFont}> {getDayNumber()[4]} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.generalFontTitle}> {getDayName()[5]} </Text>
                            <Text style={styles.generalFont}> {getDayNumber()[5]} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.personalHabits}>Personal Habits </Text>
                <View style={styles.scrollableContainer}>
                    <ScrollView>
                        <TouchableOpacity style={styles.habitsContainer}>
                            <View style={styles.habitIcon}>
                                <Icon name="photo" size={30} color="white"></Icon>
                            </View>
                            <Text style={styles.username}> Habit 1 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.habitsContainer}>
                            <View style={styles.habitIcon}>
                                <Icon name="photo" size={30} color="white"></Icon>
                            </View>
                            <Text style={styles.username}> Habit 2 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.habitsContainer}>
                            <View style={styles.habitIcon}>
                                <Icon name="photo" size={30} color="white"></Icon>
                            </View>
                            <Text style={styles.username}> Habit 3 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.habitsContainer}>
                            <View style={styles.habitIcon}>
                                <Icon name="photo" size={30} color="white"></Icon>
                            </View>
                            <Text style={styles.username}> Habit 4 </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    habitIcon: {
        height: 60,
        width: 60,
        marginLeft: 20,
        backgroundColor: "#868AE0",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    habitsContainer: {
        height: 100,
        width: "100%",
        backgroundColor: "#E8E8F7",
        borderRadius: "30%",
        marginTop: 13,
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    scrollableContainer: {
        height: "60%"
    },
    generalFontTitle: {
        color: "#4E53BA",
        fontWeight: "300"
    },
    generalFont: {
        color: "#4E53BA",
        fontWeight: "500"
    },
    button: {
        margin: "5%",
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: "20%",
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
        justifyContent: "center"
    },
    container: {
        height: 64,
        flexDirection: "row",
    },
    container2: {
        flexDirection: 'column',
        height: 64,
    },
    container3: {
        marginTop: 13,
        flexDirection: 'row',
        height: 65,
    },
    date: {
        marginTop: 20,
        fontWeight: "400",
        fontFamily: "roboto-regular",
        fontSize: 12,
        color: "#4E53BA"
    },
    welcome: {
        marginTop: 10,
        marginLeft: 10,
        fontFamily: "roboto-regular",
        fontSize: 16,
        fontWeight: "200",
        color: "#868AE0"
    },
    username: {
        marginTop: 2,
        marginLeft: 10,
        fontWeight: "700",
        fontSize: 20,
        color: "#110580"
    },
    personalHabits: {
        fontWeight: "700",
        fontSize: 20,
        color: "#110580",
        marginTop: 18
    },
    margin: {
        marginTop: "15%",
        marginLeft: "8%",
        marginRight: "8%",
        marginBottom: "15%",
    }
});
