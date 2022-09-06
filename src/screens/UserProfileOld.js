import { SafeAreaView, Text } from "react-native";
import { Avatar } from "react-native-paper";
import React, { useContext, useState } from "react";
import Button from "../components/loginButton";
import * as ImagePicker from "expo-image-picker";
import axiosConn from "../api/config";

const getBlob = async (fileUri) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

const UserProfile = () => {
  const [image, setImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
      const { url } = response.data;

      //post image to presigned url
      const imageBody = await getBlob(image);
      const uploadTos3 = await fetch(url, {
        method: "PUT",
        body: imageBody,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      console.log(JSON.stringify(uploadTos3));
      const imageUrl = url.split("?")[0];

      //setImage uri to s3 url
      setImage(imageUrl);
    } catch (error) {
      console.log(error);
    }

    //update url and rest of profile data to mongodb
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {image ? (
        <Avatar.Image
          size={250}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Avatar.Icon size={250} icon="account" />
      )}
      <Button mode="contained" onPress={pickImage}>
        Select Image
      </Button>
      <Button mode="contained" onPress={uploadImage}>
        Upload Image to s3
      </Button>
    </SafeAreaView>
  );
};

export default UserProfile;
