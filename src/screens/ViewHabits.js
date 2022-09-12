import { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../styles/styles";
import BackButton from "../components/loginBackButton";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axiosConn from "../api/config";
import React from "react";
import Moment from "react-moment";
import moment from "moment";


const ViewHabit = ({ navigation }) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [habitDesc, setHabitDesc] = useState("Default description example description example")
    const [freq, setFreq] = useState("Daily")
    const [endDate, setEndDate] = useState("21 May 2023")
    const [privacy, setPrivacy] = useState("Private")
    const [habitName, setHabitName] = useState("Sleep more")
    const [dates, setDates] = useState();

    // listOfDates.forEach((day) => {
    //     newDaysObject[day] = {
    //         selected: true, selectedColor: "#E8E8F7"
    //     }
    // })

    const exampleHabit = '62fc6d14996aca158ce458b2' //To be replaced with props passed in

    useEffect(() => {
        const url = `/api/v1/habits/${exampleHabit}`;
        const fetchData = async () => {
            try {
                const response = await axiosConn.get(url);
                const endDate = response.data.data.endDate;
                setHabitDesc(response.data.data.description);
                setHabitName(response.data.data.name);
                if (response.data.data.private == false){
                    setPrivacy("Public")
                } else {
                    setPrivacy("Private")
                }
                setEndDate(moment(endDate).local().format("YYYY-MM-DD"))
                const createdAt = response.data.data.createdAt;
                const frequency = response.data.data.frequency;
                setFreq(frequency[0].repeat)
                if (frequency[0].repeat == "daily") {
                    let current = new Date(createdAt);
                    let end = new Date(endDate)
                    let listOfDates = [];
                    listOfDates.push(moment(createdAt).local().format("YYYY-MM-DD"))
                    while (current <= end) {
                        current.setDate(current.getDate() + 1)
                        listOfDates.push(moment(current).local().format("YYYY-MM-DD"))
                    }
                    let newDaysObject = {};
                    listOfDates.forEach((day) => {
                        newDaysObject[day] = {
                            selected: true, selectedColor: "#E8E8F7"
                        }
                    })
                    setDates(newDaysObject);
                } else if (frequency[0].repeat == "weekly"){
                    let current = new Date(createdAt);
                    let end = new Date(endDate)
                    let listOfDates = [];
                    let newDaysObject = {};
                    if (frequency[0].mon == true){
                        let output = datesCalculation(1, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].tues == true){
                        let output = datesCalculation(2, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].wed == true){
                        let output = datesCalculation(3, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].thurs == true){
                        let output = datesCalculation(4, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].fri == true){
                        let output = datesCalculation(5, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].sat == true){
                        let output = datesCalculation(6, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    if (frequency[0].sun == true){
                        let output = datesCalculation(0, current, end)
                        listOfDates = listOfDates.concat(output);
                    }
                    listOfDates.forEach((day) => {
                        newDaysObject[day] = {
                            selected: true, selectedColor: "#E8E8F7"
                        }
                    })
                    setDates(newDaysObject);
                }
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    },[]);

    const datesCalculation = (weekday, current, end) => {
        let calculatedDates = []
        let upcomingDay = new Date(current);
        upcomingDay.setDate(current.getDate()+((7-current.getDay())%7+weekday)%7);
        while (upcomingDay <= end) {
            calculatedDates.push(moment(upcomingDay).local().format("YYYY-MM-DD"))
            upcomingDay.setDate(upcomingDay.getDate() + 7)
        }
        return calculatedDates
    }

    return (
        <View style={styles.habitcontainer}>
            <BackButton goBack={navigation.goBack}/>
            <TouchableOpacity style={styles.trashcan}>
                <FontAwesome
                    name="trash-o"
                    size={20}
                >
                </FontAwesome>
            </TouchableOpacity>
            <View style={styles.viewHabit}>
                <Text style={styles.topHeader}>{habitName}</Text>
                <TouchableOpacity style={{ marginLeft: "3%" }}>
                    <AntDesign
                        name="edit"
                        size={20}
                        style={{ marginLeft: "3%" }}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Calendar
                style={{
                    width: 300,
                    marginLeft: "5%",
                    marginRight: "5%",
                    borderColor: "#878585",
                    borderWidth: 1,
                    borderRadius: "20%",
                    minHeight: 320

                }}
                markedDates={
                    dates
                }
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    selectedDayTextColor: '#110580',
                    todayTextColor: '#110580',
                    arrowColor: '#110580',
                    monthTextColor: '#110580',
                    textMonthFontWeight: 'bold',
                }}
            />
            <Text style={[styles.viewHabitTitle, { marginTop: "5%" }]}>Habit Description</Text>
            <Text style={styles.viewHabitDescription}> {habitDesc} </Text>
            <Text style={styles.viewHabitTitle}>Frequency</Text>
            <Text style={styles.viewHabitDescription}> {freq} </Text>
            <Text style={styles.viewHabitTitle}>End Date</Text>
            <Text style={styles.viewHabitDescription}> {endDate} </Text>
            <Text style={styles.viewHabitTitle}>Habit Privacy</Text>
            <Text style={styles.viewHabitDescription}> {privacy} </Text>
        </View>
    );
};

export default ViewHabit;