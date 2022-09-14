import * as React from "react";
import { useState, useEffect } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
} from "react-native";
import axiosConn from "../api/config";
import TextInput from "../components/loginTextInput";
import Button from "../components/loginButton";
import { styles } from "../styles/styles";
import BackButton from "../components/loginBackButton";
import { IconButton, Modal, Portal, Provider } from "react-native-paper";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AnimatedLoader from "../components/AnimatedLoader";

const getBlob = async (fileUri) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
};

const UserProfile = ({ navigation }) => {
    const [userData, setuserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        gender: "",
        avatarUrl: "",
    });
    const [original, setoriginal] = useState({
        firstName: "",
        lastName: "",
        username: "",
        bio: "",
        gender: "",
        avatarUrl: "",
    });
    const [firstName, setfirstName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [username, setusername] = useState(null);
    const [bio, setbio] = useState(null);
    const [gender, setgender] = useState(null);
    const [avatarUrl, setavatarUrl] = useState(null);
    const [disableform, setdisableform] = useState(true);
    const [ismale, setismale] = useState(null);
    const [image, setImage] = useState(null);
    const [email, setemail] = useState(null);
    const [unchanged, setunchanged] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [visible, setVisible] = React.useState(false);

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

    useEffect(() => {
        setIsLoading(true);
        const url = "/api/v1/users/profile";
        const fetchData = async () => {
            try {
                const response = await axiosConn.get(url);
                const lusername = response.data.data.username;
                const lemail = response.data.data.email;
                const lavatarUrl = response.data.data.avatarUrl;
                const lbio = response.data.data.bio;
                const lfirstName = response.data.data.firstName;
                const lgender = response.data.data.gender;
                const llastName = response.data.data.lastName;
                setfirstName(lfirstName);
                setlastName(llastName);
                setusername(lusername);
                setemail(lemail);
                setbio(lbio);
                setgender(lgender);
                setavatarUrl(lavatarUrl);
                setImage(lavatarUrl);
                setoriginal((prevUser) => ({
                    ...prevUser,
                    firstName: lfirstName,
                    lastName: llastName,
                    username: lusername,
                    bio: lbio,
                    gender: lgender,
                    avatarUrl: lavatarUrl,
                }));
                setuserData((prevUser) => ({
                    ...prevUser,
                    firstName: lfirstName,
                    lastName: llastName,
                    username: lusername,
                    bio: lbio,
                    gender: lgender,
                    avatarUrl: lavatarUrl,
                }));
                setunchanged(true);
                setIsLoading(false);
                if ((lgender = "Male")) {
                    setismale(true);
                } else if ((lgender = "Female")) {
                    setismale(false);
                };
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const prepare = () => {
            setuserData((prevUser) => ({
                ...prevUser,
                firstName: firstName,
                lastName: lastName,
                username: username,
                bio: bio,
                gender: gender,
                avatarUrl: image,
            }));
        };
        const checkk = () => {
            setunchanged(Boolean(userData === original));
        };
        prepare();
        checkk();
    }, [firstName, lastName, username, bio, gender, image]);

    // useEffect(
    //     () =>
    //         navigation.addListener('beforeRemove', (e) => {
    //             if (unchanged) {
    //                 // If we don't have unsaved changes, then we don't need to do anything
    //                 return;
    //             }

    //             // Prevent default behavior of leaving the screen
    //             e.preventDefault();

    //             // Prompt the user before leaving the screen
    //             Alert.alert(
    //                 'Discard changes?',
    //                 'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //                 [
    //                     { text: "Don't leave", style: 'cancel', onPress: () => { } },
    //                     {
    //                         text: 'Discard',
    //                         style: 'destructive',
    //                         // If the user confirmed, then we dispatch the action we blocked earlier
    //                         // This will continue the action that had triggered the removal of the screen
    //                         onPress: () => navigation.dispatch(e.data.action),
    //                     },
    //                 ]
    //             );
    //         }),
    //     [navigation, unchanged]
    // );

    const createUser = async () => {
        try {
            setIsLoading(true);
            const s3Url = await uploadImage();
            const url = "/api/v1/users/profile";
            const response = await axiosConn.put(url, {
                ...userData,
                avatarUrl: s3Url,
            });
            if (response) {
                Alert.alert("SUCCESS", "User Updated", [{ text: "Ok" }]);
            }
            setIsLoading(false);
            setunchanged(true);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const endPoint = "/api/v1/users/uploadurl";
        try {
            //call uploadurl to get presigned url
            const response = await axiosConn.get(endPoint);
            const { url } = await response.data;
            //post image to presigned url
            const imageBody = await getBlob(image);
            const uploadTos3 = await fetch(url, {
                method: "PUT",
                body: imageBody,
                headers: {
                    "Content-Type": "image/jpeg",
                },
            });
            const s3Url = url.split("?")[0];
            return s3Url;
        } catch (error) {
            console.log(error);
        }
    };

    const checkchanged = () => {
        if (unchanged) {
            navigation.replace("Base", { screen: "Home" });
        }
        showModal();
    };

    return (
        <Provider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styless.container}
                enabled={true}
            >
                <View style={styles.profilecontainer}>
                    <BackButton goBack={checkchanged} />
                    <IconButton
                        style={styles.editbtn}
                        icon="pencil-outline"
                        size={20}
                        onPress={() => {
                            setdisableform(!disableform);
                        }}
                    />
                    <Text style={styles.profilename}>Profile</Text>
                    {image ? (
                        <Avatar.Image
                            style={styles.profilepic}
                            size={100}
                            source={{
                                uri: image,
                            }}
                        />
                    ) : (
                        <Avatar.Icon style={styles.profilepic} size={100} icon="account" />
                    )}
                    <IconButton
                        style={styles.camerabtn}
                        icon="camera"
                        color="#fff"
                        size={22}
                        onPress={() => {
                            pickImage();
                        }}
                        disabled={disableform ? true : false}
                    />
                    <Text style={styles.profileemail}>{email}</Text>
                </View>
                <View style={styles.profilecontainer3}>
                    <ScrollView>
                        <View style={styles.profilecontainer2}>
                            <Text style={styles.headerTxt}>First Name</Text>
                            <TextInput
                                placeholder={firstName}
                                onChangeText={(value) => {
                                    setfirstName(value);
                                }}
                                value={firstName}
                                disabled={disableform ? true : false}
                            />
                            <Text style={styles.headerTxt}>Last Name</Text>
                            <TextInput
                                placeholder={lastName}
                                onChangeText={(value) => {
                                    setlastName(value);
                                }}
                                value={lastName}
                                disabled={disableform ? true : false}
                            />
                            <Text style={styles.headerTxt}>Username</Text>
                            <TextInput
                                placeholder={username}
                                onChangeText={(value) => {
                                    setusername(value);
                                }}
                                value={username}
                                disabled={disableform ? true : false}
                            />
                            <Text style={styles.headerTxt}>Biography</Text>
                            <TextInput
                                placeholder={bio}
                                onChangeText={(value) => {
                                    setbio(value);
                                }}
                                value={bio}
                                disabled={disableform ? true : false}
                            />
                            <Text style={styles.headerTxt}>Gender</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Button
                                    style={ismale ? styles.buttonNot : styles.buttonYes}
                                    onPress={() => {
                                        setgender("Female");
                                        setismale(false);
                                    }}
                                    disabled={disableform ? true : false}
                                >
                                    Female
                                </Button>
                                <Button
                                    style={ismale ? styles.buttonYes : styles.buttonNot}
                                    onPress={() => {
                                        setgender("Male");
                                        setismale(true);
                                    }}
                                    disabled={disableform ? true : false}
                                >
                                    Male
                                </Button>
                            </View>
                            <Button
                                style={disableform ? styles.buttonunselected : styles.buttonYes}
                                onPress={() => {
                                    createUser();
                                }}
                                disabled={disableform ? true : false}
                            >
                                Update
                            </Button>
                        </View>
                    </ScrollView>
                    <Portal>
                        <Modal
                            visible={visible}
                            onDismiss={hideModal}
                            contentContainerStyle={containerStyle}
                        >
                            <Image source={require("../assets/Wait.png")} />
                            <Text style={styles.popheader}>W...Wait!</Text>
                            <Text style={styles.popTxt}>
                                Did you want to save your changes before leaving?
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Button style={styles.buttonNot} onPress={hideModal}>
                                    Nahh
                                </Button>
                                <Button
                                    style={styles.buttonYes}
                                    onPress={() => navigation.replace("Base", { screen: "Home" })}
                                >
                                    Sure!
                                </Button>
                            </View>
                        </Modal>
                    </Portal>
                </View>
            </KeyboardAvoidingView>
            {isLoading ? <AnimatedLoader text="Loading..." /> : null}
        </Provider>
    );
};

export default UserProfile;

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8E8F7",
    },
});