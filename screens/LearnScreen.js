import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import "firebase/firestore";
import firebase from "firebase/app";
import { Button, IconButton, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";

const LearnScreen = () => {
  const [key, setKey] = useState("");
  const [house, setHouse] = useState("");
  const [users, setUsers] = useState([]);

  const { onboarded, setOnboard } = React.useContext(RootContext);

  const navigation = useNavigation();

  const firestore = firebase.firestore();

  let doc = house + " " + "House";

  useEffect(() => {
    const retireveHouseColor = async () => {
      let retrieveData = await AsyncStorage.getItem("House");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setHouse(retrieveData);
      else setHouse(retrieveData);
    };
    retireveHouseColor();
    const retrieveKey = async () => {
      let retrieveData = await AsyncStorage.getItem("Key");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setKey(retrieveData);
      else setKey(retrieveData);
    };
    retrieveKey();
  }, []);

  useEffect(() => {
    const HouseRef = firestore.collection("users").doc(doc);
    HouseRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setUsers(snapshot.data().users);
      } else {
        console.log(doc + " document does not exist");
      }
    });
  }, [house]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => handleDeleteButton(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: moderateScale(190),
            height: moderateScale(190),
            position: "absolute",
            top: moderateScale(20),
          }}
          source={require("../assets/images/sf-logo.png")}
        />
        <Text
          style={{
            fontFamily: "RobotBold",
            marginTop: moderateScale(230),
            fontSize: moderateScale(20),
          }}
        >
          Mission Statement
        </Text>
        <Text
          style={{
            fontFamily: "Robot",
            marginTop: moderateScale(10),
            fontSize: moderateScale(18),
            width: "80%",
          }}
        >
          {"    "}
          Our mission is to organize events to facilitate unity and create
          change within the Irvine High School campus, through an accessible and
          inclusive forum to plan, create, and impact the community together.
        </Text>
        <Text
          style={{
            fontFamily: "RobotBold",
            marginTop: moderateScale(30),
            fontSize: moderateScale(20),
          }}
        >
          Behavior Expectations
        </Text>
        <Text
          style={{
            fontFamily: "Robot",
            marginTop: moderateScale(10),
            fontSize: moderateScale(18),
            width: "80%",
          }}
        >
          {"    "}
          This is a student government organization, NOT a club, behavior should
          be representative of that. You represent the school. You represent
          Student Forum on campus. Excellent behavior is expected. Professional
          decorum is expected. Positive attitude is expected. This is a student
          government organization, there are events frequently.
        </Text>
        <Text
          style={{
            fontFamily: "RobotBold",
            marginTop: moderateScale(30),
            fontSize: moderateScale(20),
          }}
        >
          Points System
        </Text>
        <Text
          style={{
            fontFamily: "Robot",
            marginTop: moderateScale(10),
            fontSize: moderateScale(18),
            width: "80%",
          }}
        >
          {"    "}
          Members will earn points based on attendance, involvement, and effort
          in each quarter. Each quarter, each member has to earn 10 points to
          receive the .5 leadership credit for that quarter. For the entire
          year, members can recieve up to 1 leadership credit by having 20
          points or more
        </Text>
        <Text
          style={{
            fontFamily: "RobotBold",
            marginTop: moderateScale(30),
            fontSize: moderateScale(20),
          }}
        >
          Leadership Credit
        </Text>
        <Text
          style={{
            fontFamily: "Robot",
            marginTop: moderateScale(10),
            fontSize: moderateScale(18),
            width: "80%",
          }}
        >
          {"    "}
          Leadership Credits are the best way to display your skills as a leader
          as it goes directly to your permanent transcript. Leadership Credits
          do not go into the transcript as a normal credit; it is noted as a
          special credit that is especially useful when applying for colleges.
          Having many of the Leadership Credits holds immense prestige as it is
          hard to receive even one.
        </Text>
        <Text
          blue
          style={{
            fontFamily: "RobotBold",
            marginTop: moderateScale(30),
            fontSize: moderateScale(20),
          }}
        >
          Developer Contact
        </Text>
        <Text
          style={{
            fontFamily: "Robot",
            marginTop: moderateScale(10),
            fontSize: moderateScale(18),
            marginBottom: moderateScale(70),
            width: "80%",
          }}
        >
          Name: Jiwon Jeong {"                     "}Email:
          jiwonjeong414@gmail.com
        </Text>
        <Button
          mode="contained"
          style={{
            marginBottom: moderateScale(80),
            width: moderateScale(210),
            height: moderateScale(45),
            justifyContent: "center",
          }}
          labelStyle={{
            fontSize: moderateScale(21),
            fontFamily: "Ubuntu",
          }}
          onPress={handleDelete}
        >
          Delete Account
        </Button>
      </View>
    </ScrollView>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
