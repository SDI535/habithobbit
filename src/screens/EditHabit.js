import { React, useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axiosConn from "../api/config";
import TextInput from "../components/loginTextInput";
import Button from "../components/loginButton";
import { styles } from "../styles/styles";
import BackButton from "../components/loginBackButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { habitValidator } from "../helpers/habitValidator";
import { Switch } from "react-native-paper";
import moment from "moment";
import AnimatedLoader from "../components/AnimatedLoader";

const EditHabit = ({ route, navigation }) => {
  let { masterHabit } = route.params;
  const [habitData, setHabitData] = useState({
    name: "",
    description: "",
    frequency: {
      repeat: "daily",
      mon: true,
      tues: true,
      wed: true,
      thurs: true,
      fri: true,
      sat: true,
      sun: true,
    },
    endDate: "",
    targetCount: 0,
    currentCount: 0,
    private: false,
  });

  // const [originalData, setOriginalData] = useState({
  //   name: "",
  //   description: "",
  //   frequency: {
  //     repeat: "daily",
  //     mon: true,
  //     tues: true,
  //     wed: true,
  //     thurs: true,
  //     fri: true,
  //     sat: true,
  //     sun: true,
  //   },
  //   endDate: "",
  //   targetCount: 0,
  //   currentCount: 0,
  //   private: false,
  // });

  const [habit, setHabit] = useState(masterHabit.name);
  const [habitDesc, setHabitDesc] = useState(masterHabit.description);
  const [openFreq, setOpenFreq] = useState(false);
  const [freqValue, setFreqValue] = useState(masterHabit.frequency[0].repeat);
  const [freq, setFreq] = useState([
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
  ]);
  const [openDay, setOpenDay] = useState(false);
  const [dayValue, setDayValue] = useState([]);
  const [day, setDay] = useState([
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 7 },
  ]);
  const [endDate, setEndDate] = useState(masterHabit.endDate);
  const prettyDate = moment(endDate).format("DD MMMM YYYY");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onTogglePrivacy = () => setIsPrivacyOn(!isPrivacyOn);
  const [isPrivacyOn, setIsPrivacyOn] = useState(masterHabit.private);
  const createdAt = masterHabit.createdAt;
  const [unchanged, setunchanged] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [masterHabitl, setMasterHabitl] = useState(masterHabit);

  // console.log(masterHabit);
  // console.log("End date:", endDate);

  useEffect(() => {
    let arrayList = [];
    if (masterHabit.frequency[0].repeat == "daily") {
      arrayList = [1, 2, 3, 4, 5, 6, 7];
    } else if (masterHabit.frequency[0].repeat == "weekly") {
      if (masterHabit.frequency[0].mon == true) {
        arrayList.push(1);
      }
      if (masterHabit.frequency[0].tues == true) {
        arrayList.push(2);
      }
      if (masterHabit.frequency[0].wed == true) {
        arrayList.push(3);
      }
      if (masterHabit.frequency[0].thurs == true) {
        arrayList.push(4);
      }
      if (masterHabit.frequency[0].fri == true) {
        arrayList.push(5);
      }
      if (masterHabit.frequency[0].sat == true) {
        arrayList.push(6);
      }
      if (masterHabit.frequency[0].sun == true) {
        arrayList.push(7);
      }
    }
    setDayValue(arrayList);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    const prepare = () => {
      setHabitData((prevHabit) => ({
        ...prevHabit,
        name: habit,
        description: habitDesc,
        frequency: {
          repeat: freqValue,
          mon: dayValue.includes(1),
          tues: dayValue.includes(2),
          wed: dayValue.includes(3),
          thurs: dayValue.includes(4),
          fri: dayValue.includes(5),
          sat: dayValue.includes(6),
          sun: dayValue.includes(7),
        },
        endDate: endDate,
        currentCount: masterHabit.currentCount,
        targetCount: calculateTargetCount(),
        private: isPrivacyOn,
      }));
    };
    prepare();
  }, [habit, habitDesc, freqValue, dayValue, endDate, isPrivacyOn]);

  const saveEditHabit = async () => {
    try {
      setIsLoading(true);
      const url = `/api/v1/habits/${masterHabit._id}`;
      const response = await axiosConn.put(url, habitData);
      if (response) {
        Alert.alert("SUCCESS", "Habit is updated!", [{ text: "Ok" }]);
      }
      masterHabit = response.data.data;
      setMasterHabitl(response.data.data);
      setIsLoading(false);
      setIsUpdated(true);
      //setunchanged(true);
    } catch (error) {
      //Alert.alert("Plese enter a habit");
      //habitInputError();
      console.log(error.response.data);
    }
  };

  //Datetime picker
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (event.type === "neutralButtonPressed") {
      setEndDate(new Date(0));
    } else {
      setEndDate(currentDate);
    }
  };

  const calculateTargetCount = () => {
    let totalCount = 0;
    let start = moment(createdAt);
    let end = moment(endDate);

    // if freq = daily, totalCount = daysInterval (minus day it was created)
    // if freq = weekly, and startday = wed, selection is every  thurs, sat, tuesday, wednesday - starts this week (thurs, sat) and thereafter (wednesday, tues, thurs, sat)
    // totalCount = weeks (including this week) x count of days - (1st occurrance of days that is before startday) - (last occurance of days that is after end date)
    if (freqValue === "daily") {
      let daysInterval = end.diff(start, "days", true);
      totalCount = Math.round(daysInterval) + 1;
    } else {
      let diffinWeeks = end.diff(start, "weeks", true);
      // get count of selected days per week
      let countPerWeek = dayValue.length;

      const startDay = start.isoWeekday();
      const endDay = end.isoWeekday();

      let count = 0;
      for (let i = 0; i < dayValue.length; i++) {
        if (dayValue[i] < startDay || dayValue[i] > endDay) {
          count++;
        }
      }
      totalCount = (Math.round(diffinWeeks) + 1) * countPerWeek - count;
    }
    return totalCount;
  };

  // //Habit input validator
  // const [habitCreate, setHabitCreate] = useState({habit: ""});
  // const [errorHabit, setErrorHabit] = useState({error: ""});

  // const twoCallsHabit = (e) => {
  //   setHabitCreate((value) => {setHabit(value)});
  //   setErrorHabit({error: ""});
  // }

  // const habitInputError = async () => {
  //   const habitError = habitValidator(habitCreate.habit);
  //   if (habitError) {
  //     setErrorHabit({...errorHabit, error: habitError});
  //     return;
  //   }
  // }

  const clearForm = () => {
    setHabit("");
    setHabitDesc("");
    setFreqValue("weekly");
    setDayValue([moment().isoWeekday()]);
    setEndDate(moment().toDate());
    setIsPrivacyOn(false);
  };

  const selectAllDays = (value) => {
    if (value === "daily") {
      setDayValue([1, 2, 3, 4, 5, 6, 7]);
    }
  };

  const selectFreq = (value) => {
    if (value.length < 7) {
      setFreqValue("weekly");
    } else setFreqValue("daily");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.habitcontainer}>
          <BackButton goBack={navigation.goBack} />
          <Text style={styles.topHeader}>Edit Habit</Text>
          <Text style={styles.headerTxt}>Habit</Text>
          <TextInput
            placeholder={habit}
            value={habit}
            returnKeyType="next"
            onChangeText={(value) => {
              setHabit(value);
            }}
            // onChangeText={
            //   (value) => twoCallsHabit(value)}
            // error={!!errorHabit.error}
            // errorText={errorHabit.error}
          />

          <Text style={styles.headerTxt}>Habit Description</Text>
          <TextInput
            placeholder="No Description"
            onChangeText={(value) => {
              setHabitDesc(value);
            }}
            value={habitDesc}
            returnKeyType="next"
          />

          <Text style={styles.headerTxt}>Repeat</Text>
          <DropDownPicker
            style={styles.freqDropdown}
            placeholderStyle={styles.freqPlaceholder}
            textStyle={styles.freqText}
            dropDownContainerStyle={styles.dropDown}
            open={openFreq}
            value={freqValue}
            items={freq}
            setOpen={setOpenFreq}
            setValue={setFreqValue}
            setItems={setFreq}
            onChangeValue={(value) => {
              selectAllDays(value);
            }}
            mode="BADGE"
            placeholder="Select Frequency"
            zIndex={3000}
          />
          <DropDownPicker
            style={styles.dayDropdown}
            listItemLabelStyle={styles.listItemDropdown}
            dropDownContainerStyle={styles.dropDown}
            badgeTextStyle={styles.badgeTextDropdown}
            open={openDay}
            value={dayValue}
            items={day}
            setOpen={setOpenDay}
            setValue={setDayValue}
            setItems={setDay}
            onChangeValue={(value) => {
              selectFreq(value);
            }}
            mode="BADGE"
            multiple={true}
            badgeColors={"#868AE0"}
            badgeDotColors={"#110580"}
            maxHeight={300}
            zIndex={2000}
          />

          <Text style={styles.headerTxt}>End Date</Text>
          <Button
            style={styles.endDate}
            labelStyle={styles.endDateLabel}
            onPress={() => {
              setShow((prev) => !prev);
            }}
            mode="outlined"
          >
            {`${prettyDate}`}{" "}
          </Button>
          {show && (
            <DateTimePicker
              style={{ width: "100%" }}
              value={moment(endDate).toDate()}
              mode={mode}
              is24Hour={true}
              onChange={changeDate}
              display="spinner"
            />
          )}

          <Text style={styles.headerTxt}>Habit Privacy</Text>
          <View style={styles.privacyContainer}>
            <Text style={{ color: "#4E53BA", fontWeight: "bold" }}>
              Private
            </Text>
            <Switch
              style={{ color: "black" }}
              value={isPrivacyOn}
              onValueChange={onTogglePrivacy}
              trackColor={{ true: "#4E53BA" }}
            />
          </View>
          <Text style={styles.privacyText}>
            *Private habit will only be visible to you.
          </Text>

          <Button
            style={styles.button}
            onPress={() => {
              saveEditHabit();
              // navigation.navigate({
              //   name: 'ViewHabit',
              //   params: { isUpdated : masterHabitl },
              //   merge: true,
              // });
            }}
          >
            Save
          </Button>
        </View>
        {isLoading ? <AnimatedLoader text="Loading..." /> : null}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditHabit;
