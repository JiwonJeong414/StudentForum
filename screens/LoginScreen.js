import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import "firebase/firestore";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [internaluuid, setUuid] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigation = useNavigation();

  const handleAddUserData = async () => {
    // asyncstorage to save this idd (you need this cause when someone opens the app again, the uid is gone, lets make it so that they cannot signout)
    await AsyncStorage.setItem("FirstName", JSON.stringify(firstname));
    await AsyncStorage.setItem("LastName", JSON.stringify(lastname));
    navigation.navigate("House");
  };

  const handleAdmin = () => {
    navigation.navigate("Password");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={{
          width: moderateScale(190),
          height: moderateScale(190),
          position: "absolute",
          top: moderateScale(120),
        }}
        source={require("../assets/images/sf-logo.png")}
      />
      <TextInput
        label="First Name"
        onChangeText={(text) => setFirstName(text)}
        style={{ width: "60%" }}
        mode="outlined"
        activeOutlineColor="#55BCF6"
        autoCorrect={false}
      />
      <TextInput
        label="Last Name"
        onChangeText={(text) => setLastName(text)}
        style={{ width: "60%", marginTop: moderateScale(20) }}
        mode="outlined"
        activeOutlineColor="#55BCF6"
        autoCorrect={false}
      />
      <Button
        mode="contained"
        onPress={handleAddUserData}
        style={{
          position: "absolute",
          width: moderateScale(90),
          height: moderateScale(38),
          left: moderateScale(212),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(520),
          backgroundColor: "#55BCF6",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Ubuntu" }}
      >
        Next
      </Button>
      <Button
        mode="contained"
        onPress={handleAdmin}
        style={{
          position: "absolute",
          width: moderateScale(90),
          height: moderateScale(38),
          left: moderateScale(75),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(520),
          backgroundColor: "#55BCF6",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Ubuntu" }}
      >
        Admin
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
