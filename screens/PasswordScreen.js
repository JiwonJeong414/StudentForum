import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import "firebase/firestore";
import { Button, IconButton } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasswordScreen() {
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleAdmin = async () => {
    if (password === "Green House") {
      await AsyncStorage.setItem("Admin", JSON.stringify("Green"));
      navigation.navigate("Admin");
    } else if (password === "Pink House") {
      await AsyncStorage.setItem("Admin", JSON.stringify("Pink"));
      navigation.navigate("Admin");
    } else if (password === "Blue House") {
      await AsyncStorage.setItem("Admin", JSON.stringify("Blue"));
      navigation.navigate("Admin");
    } else if (password === "Orange House") {
      await AsyncStorage.setItem("Admin", JSON.stringify("Orange"));
      navigation.navigate("Admin");
    } else {
      Alert.alert("Incorrect Password");
    }
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
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        style={{
          height: moderateScale(35),
          borderColor: "gray",
          textAlign: "center",
          width: moderateScale(160),
          borderRadius: moderateScale(10),
          borderWidth: moderateScale(1),
        }}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        mode="contained"
        onPress={() => handleAdmin()}
        style={{
          position: "absolute",
          width: moderateScale(140),
          height: moderateScale(38),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(450),
          backgroundColor: "#55BCF6",
        }}
        labelStyle={{ fontSize: moderateScale(19), fontFamily: "Ubuntu" }}
      >
        Submit
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
