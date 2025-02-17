import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
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

const LoginScreen = () => {
  const [internaluuid, setUuid] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigation = useNavigation();

  const handleAddUserData = async () => {
    // asyncstorage to save this idd (you need this cause when someone opens the app again, the uid is gone, lets make it so that they cannot signout)
    if (firstname === "" || lastname === "") {
      Alert.alert("Alert", "Please Put Your First And Last Name!");
    } else {
      await AsyncStorage.setItem("FirstName", JSON.stringify(firstname));
      await AsyncStorage.setItem("LastName", JSON.stringify(lastname));
      navigation.navigate("House");
    }
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
          marginTop: moderateScale(-120),
          marginBottom: moderateScale(20),
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
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="contained"
          onPress={handleAdmin}
          style={{
            width: moderateScale(90),
            marginRight: moderateScale(50),
            marginTop: moderateScale(30),
            height: moderateScale(38),
            alignSelf: "flex-start",
            borderRadius: moderateScale(30),
            backgroundColor: "#55BCF6",
          }}
          labelStyle={{ fontSize: moderateScale(17), fontFamily: "Ubuntu" }}
        >
          Admin
        </Button>
        <Button
          mode="contained"
          onPress={handleAddUserData}
          style={{
            width: moderateScale(90),
            height: moderateScale(38),
            alignSelf: "flex-end",
            borderRadius: moderateScale(30),
            backgroundColor: "#55BCF6",
          }}
          labelStyle={{ fontSize: moderateScale(17), fontFamily: "Ubuntu" }}
        >
          Next
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
