import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import "firebase/firestore";

export default function HomeScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [key, setKey] = useState("");
  const [points, setPoints] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const firestore = firebase.firestore();

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
    const retrieveKey = async () => {
      let retrieveData = await AsyncStorage.getItem("Key");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setKey(retrieveData);
      else setKey(retrieveData);
    };
    retrieveKey();
  }, []);

  // updates automatically when incrementing on firebase
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc("Pink House")
      .onSnapshot((snapshot) => {
        let id = key;
        if (snapshot.exists & (key !== "")) {
          const user = snapshot.data().users.find((user) => user.id === id);
          setPoints(user.points);
        } else {
          console.log("Pink House document does not exist");
        }
      });
    return () => unsubscribe();
  }, [key]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: screenWidth,
          height: screenHeight,
          position: "absolute",
        }}
        source={require("../assets/images/pink-01.png")}
      />
      <Text
        style={{
          fontSize: moderateScale(100),
          marginTop: moderateScale(50),
          fontFamily: "Robot",
        }}
      >
        {points}
      </Text>
      {points <= 1 ? (
        <Text
          style={{
            fontSize: moderateScale(30),
            marginTop: moderateScale(-20),
            fontFamily: "Robot",
          }}
        >
          Point
        </Text>
      ) : (
        <Text
          style={{
            fontSize: moderateScale(30),
            marginTop: moderateScale(-20),
            fontFamily: "Robot",
          }}
        >
          Points
        </Text>
      )}
      <View style={styles.divider}></View>
      <Text
        style={{
          fontSize: moderateScale(40),
          marginTop: moderateScale(20),
          marginBottom: moderateScale(-20),
          fontFamily: "Robot",
        }}
      >
        Hi {firstName}!
      </Text>
      <View style={styles.rectangle}>
        <View style={styles.circle} />
        <Text
          style={{
            fontSize: moderateScale(26),
            fontFamily: "Ubuntu",
            color: "white",
            bottom: moderateScale(1),
          }}
        >
          Next Milestone
        </Text>
      </View>
      <View style={styles.rectangle}>
        <View style={styles.circle} />
        <Text
          style={{
            fontSize: moderateScale(26),
            fontFamily: "Ubuntu",
            color: "white",
            bottom: moderateScale(1),
          }}
        >
          Points History
        </Text>
      </View>
      <View style={styles.rectangle}>
        <View style={styles.circle} />
        <Text
          style={{
            fontSize: moderateScale(26),
            fontFamily: "Ubuntu",
            color: "white",
            bottom: moderateScale(1),
          }}
        >
          Learn {"&"} Explore
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(40),
  },
  divider: {
    backgroundColor: "gray",
    marginTop: moderateScale(20),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "50%",
    height: moderateScale(10),
  },
  rectangle: {
    width: "80%",
    backgroundColor: "#6254de",
    borderRadius: moderateScale(30),
    marginTop: moderateScale(50),
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    height: moderateScale(80),
  },
  circle: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginLeft: moderateScale(20),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginRight: moderateScale(15),
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(100),
    borderColor: "#eb7cd8",
  },
});
