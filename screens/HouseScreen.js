import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import "firebase/firestore";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HouseScreen() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [house, setHouse] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const retireveFirstName = async () => {
      let retrieveData = await AsyncStorage.getItem("FirstName");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setFirstName(retrieveData);
      else setFirstName(retrieveData);
    };
    retireveFirstName();
    const retrieveLastName = async () => {
      let retrieveData = await AsyncStorage.getItem("LastName");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setLastName(retrieveData);
      else setLastName(retrieveData);
    };
    retrieveLastName();
  }, []);

  const handleSetUser = (houseColor) => {
    let idd = uuid.v4().toString();
    firebase
      .firestore()
      .collection("users")
      .doc(houseColor)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion({
          firstname: firstname,
          lastname: lastname,
          points: 0,
          id: idd,
        }),
      })
      .then(() => {
        console.log("User data added to Cloud Firestore");
        navigation.navigate("Home");
      });
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={{
          marginTop: moderateScale(40),

          backgroundColor: "#55BCF6",
        }}
        onPress={() => handleSetUser("Pink House")}
      >
        Pink House
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: moderateScale(40),

          backgroundColor: "#55BCF6",
        }}
        onPress={() => handleSetUser("Blue House")}
      >
        Blue House
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: moderateScale(40),

          backgroundColor: "#55BCF6",
        }}
        onPress={() => handleSetUser("Green House")}
      >
        Green House
      </Button>
      <Button
        mode="contained"
        style={{
          marginTop: moderateScale(40),

          backgroundColor: "#55BCF6",
        }}
        onPress={() => handleSetUser("Orange House")}
      >
        Orange House
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
