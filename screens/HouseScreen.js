import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import "firebase/firestore";
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
    handleAddHouse(houseColor);
    let newHouseColor = houseColor + " " + "House";
    firebase
      .firestore()
      .collection("users")
      .doc(newHouseColor)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion({
          firstname: firstname,
          lastname: lastname,
          points: 0,
          id: idd,
          pointsHistory: [],
        }),
      })
      .then(() => {
        console.log("User data added to Cloud Firestore");
        console.log(idd);
        retrieveKey(idd);
        navigation.navigate("Home");
      });
  };

  const handleAddHouse = async (houseColor) => {
    await AsyncStorage.setItem("House", JSON.stringify(houseColor));
  };

  const retrieveKey = async (id) => {
    await AsyncStorage.setItem("Key", JSON.stringify(id));
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: moderateScale(190),
          height: moderateScale(190),
          position: "absolute",
          top: moderateScale(120),
        }}
        source={require("../assets/images/sf-logo.png")}
      />
      <Text
        style={{
          fontSize: moderateScale(30),
          fontFamily: "Robot",
          top: moderateScale(-50),
        }}
      >
        Choose Your House
      </Text>
      <Button
        mode="contained"
        style={{
          position: "absolute",
          width: moderateScale(130),
          height: moderateScale(50),
          left: moderateScale(50),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(420),
          backgroundColor: "#eb7cd8",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Robot" }}
        onPress={() => handleSetUser("Pink")}
      >
        Pink
      </Button>
      <Button
        mode="contained"
        style={{
          position: "absolute",
          width: moderateScale(130),
          height: moderateScale(50),
          left: moderateScale(200),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(420),
          backgroundColor: "#0000FF",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Robot" }}
        onPress={() => handleSetUser("Blue")}
      >
        Blue
      </Button>
      <Button
        mode="contained"
        style={{
          position: "absolute",
          width: moderateScale(130),
          height: moderateScale(50),
          left: moderateScale(50),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(520),
          backgroundColor: "#228B22",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Robot" }}
        onPress={() => handleSetUser("Green")}
      >
        Green
      </Button>
      <Button
        mode="contained"
        style={{
          position: "absolute",
          width: moderateScale(130),
          height: moderateScale(50),
          left: moderateScale(200),
          justifyContent: "center",
          borderRadius: moderateScale(30),
          top: moderateScale(520),
          backgroundColor: "#FFA500",
        }}
        labelStyle={{ fontSize: moderateScale(18), fontFamily: "Robot" }}
        onPress={() => handleSetUser("Orange")}
      >
        Orange
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
