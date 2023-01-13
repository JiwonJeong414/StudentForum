import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
    navigation.navigate("Admin");
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="First Name"
        onChangeText={(text) => setFirstName(text)}
        style={{ width: "60%" }}
      />
      <TextInput
        label="Last Name"
        onChangeText={(text) => setLastName(text)}
        style={{ width: "60%", marginTop: moderateScale(20) }}
      />
      <Button
        mode="contained"
        onPress={handleAddUserData}
        style={{
          position: "absolute",
          left: moderateScale(250),
          top: moderateScale(600),
          backgroundColor: "#55BCF6",
        }}
      >
        Next
      </Button>
      <Button
        mode="contained"
        onPress={handleAdmin}
        style={{
          position: "absolute",
          left: moderateScale(80),
          top: moderateScale(600),
          backgroundColor: "#55BCF6",
        }}
      >
        Admin
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
