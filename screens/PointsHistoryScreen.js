import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import "firebase/firestore";
import { Button, IconButton, TextInput } from "react-native-paper";

const PointsHistoryScreen = () => {
  const [key, setKey] = useState("");
  const [house, setHouse] = useState("");
  const [pointsData, setPointsData] = useState([]);

  const navigation = useNavigation();

  const firestore = firebase.firestore();

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

  // updates automatically when incrementing on firebase
  useEffect(() => {
    let doc = house + " " + "House";
    const unsubscribe = firestore
      .collection("users")
      .doc(doc)
      .onSnapshot((snapshot) => {
        let id = key;
        if (snapshot.exists & (key !== "")) {
          const user = snapshot.data().users.find((user) => user.id === id);
          setPointsData(user.pointsHistory);
        } else {
          //   console.log(doc + " document does not exist");
        }
      });
    return () => unsubscribe();
  }, [key]);

  useEffect(() => {
    let document = house + " House";
    const usersRef = firestore.collection("users").doc(document);

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === key);
          setPointsData(user.pointsHistory);
          // console.log(pointsData);
        });
      })
      .then(() => {
        //  console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        //  console.log("Transaction failed: ", error);
      });
  }, [key, house]);

  const handleDone = () => {
    navigation.navigate("Home");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            house === "Green"
              ? "#9DC183"
              : house === "Blue"
              ? "#ADD8E6"
              : house === "Orange"
              ? "#FFA500"
              : "#f5a3f7",
        },
      ]}
    >
      <Text style={styles.title}>Points History</Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: moderateScale(10),
          marginBottom: moderateScale(20),
        }}
      >
        <Text style={styles.comment}>
          Comments {"                            "}
        </Text>
        <Text style={styles.points}>Points</Text>
      </View>
      <FlatList
        data={pointsData}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "Ubuntu",
                fontSize: moderateScale(21),
                marginRight: moderateScale(40),
              }}
            >
              {item.comment}
            </Text>
            <Text
              style={{
                textAlign: "right",
                fontFamily: "Ubuntu",
                fontSize: moderateScale(21),
                bottom: moderateScale(21),
              }}
            >
              {item.points}
            </Text>
            <View
              style={{
                backgroundColor: "#D3D3D3",
                bottom: moderateScale(5),
                width: moderateScale(325),
                height: moderateScale(3),
              }}
            />
          </View>
        )}
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            <Button
              mode="contained"
              style={{
                marginBottom: moderateScale(80),
                marginTop: moderateScale(20),
                width: moderateScale(140),
                height: moderateScale(45),
                justifyContent: "center",
              }}
              labelStyle={{
                fontSize: moderateScale(21),
                fontFamily: "Ubuntu",
              }}
              onPress={handleDone}
            >
              Back
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default PointsHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Robot",
    color: "white",
    fontSize: moderateScale(40),
    marginTop: Platform.OS === "ios" ? moderateScale(50) : moderateScale(30),
  },
  comment: {
    textAlign: "left",
    fontFamily: "Robot",
    color: "white",
    fontSize: moderateScale(21),
  },
  points: {
    textAlign: "right",
    fontFamily: "Robot",
    color: "white",
    fontSize: moderateScale(21),
  },
});
