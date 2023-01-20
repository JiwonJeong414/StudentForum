import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import "firebase/firestore";

export default function HomeScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [key, setKey] = useState("");
  const [points, setPoints] = useState(0);
  const [house, setHouse] = useState("");

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const firestore = firebase.firestore();

  useEffect(() => {
    const retireveHouseColor = async () => {
      let retrieveData = await AsyncStorage.getItem("House");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setHouse(retrieveData);
      else setHouse(retrieveData);
    };
    retireveHouseColor();
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
  }, [key]);

  // updates automatically when incrementing on firebase
  useEffect(() => {
    let doc = house + " " + "House";
    const unsubscribe = firestore
      .collection("users")
      .doc(doc)
      .onSnapshot((snapshot) => {
        let id = key;
        // console.log(id);
        if (snapshot.exists && key !== "") {
          const user = snapshot.data().users.find((user) => user.id === id);
          setPoints(user.points);
        } else {
          // console.log(doc + " document does not exist");
        }
      });
    return () => unsubscribe();
  }, [key]);

  // 10 points = .5 Leadership Credit
  // 20 points = 1 Leadership Credit

  const handleLearnPress = () => {
    navigation.navigate("Learn");
  };

  const handleHistoryPress = () => {
    navigation.navigate("History");
  };

  // console.log(house);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {house === "Pink" ? (
          <Image
            style={{
              width: screenWidth,
              height: screenHeight,
              position: "absolute",
            }}
            source={require("../assets/images/Pink.png")}
          />
        ) : house === "Blue" ? (
          <Image
            style={{
              width: screenWidth,
              height: screenHeight,
              position: "absolute",
            }}
            source={require("../assets/images/Blue.png")}
          />
        ) : house === "Green" ? (
          <Image
            style={{
              width: screenWidth,
              height: screenHeight,
              position: "absolute",
            }}
            source={require("../assets/images/Green.png")}
          />
        ) : (
          <Image
            style={{
              width: screenWidth,
              height: screenHeight,
              position: "absolute",
            }}
            source={require("../assets/images/Orange.png")}
          />
        )}

        <Text
          style={{
            fontSize: moderateScale(100),

            marginTop:
              Platform.OS === "ios" ? moderateScale(50) : moderateScale(-20),
            fontFamily: "Robot",
          }}
        >
          {points}
        </Text>
        {points <= 1 ? (
          <Text
            style={{
              fontSize: moderateScale(30),
              marginTop:
                Platform.OS === "ios" ? moderateScale(-20) : moderateScale(-35),
              fontFamily: "Robot",
            }}
          >
            Point
          </Text>
        ) : (
          <Text
            style={{
              fontSize: moderateScale(30),
              marginTop:
                Platform.OS === "ios" ? moderateScale(-20) : moderateScale(-35),

              fontFamily: "Robot",
            }}
          >
            Points
          </Text>
        )}
        <View
          style={[
            styles.divider,
            {
              backgroundColor:
                house === "Green"
                  ? "#8ba2e8"
                  : house === "Blue"
                  ? "#6D6D6D"
                  : house === "Orange"
                  ? "#c4f0ff"
                  : "#9585de",
            },
          ]}
        ></View>
        <Text
          style={{
            fontSize: moderateScale(40),
            marginTop:
              Platform.OS === "ios" ? moderateScale(20) : moderateScale(10),

            marginBottom:
              Platform.OS === "ios" ? moderateScale(-20) : moderateScale(-35),

            fontFamily: "Robot",
          }}
        >
          Hi {firstName}!
        </Text>
        <TouchableOpacity onPress={handleHistoryPress}>
          <View
            style={[
              styles.rectangle,
              {
                backgroundColor:
                  house === "Green"
                    ? "royalblue"
                    : house === "Blue"
                    ? "#1c1c1c"
                    : house === "Orange"
                    ? "deepskyblue"
                    : "#6254de",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="star-four-points"
              size={moderateScale(35)}
              style={{
                color: "white",
                right: moderateScale(20),
              }}
            />
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
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLearnPress}>
          <View
            style={[
              styles.rectangle,
              {
                backgroundColor:
                  house === "Green"
                    ? "royalblue"
                    : house === "Blue"
                    ? "#1c1c1c"
                    : house === "Orange"
                    ? "deepskyblue"
                    : "#6254de",
              },
            ]}
          >
            <MaterialIcons
              name="explore"
              size={moderateScale(35)}
              style={{
                color: "white",
                right: moderateScale(12),
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(26),
                left: moderateScale(8),
                fontFamily: "Ubuntu",
                color: "white",
                bottom: moderateScale(1),
              }}
            >
              Learn {"&"} Explore
            </Text>
          </View>
        </TouchableOpacity>
        {points < 10 ? (
          <View
            style={[
              styles.square,
              {
                backgroundColor:
                  house === "Green"
                    ? "royalblue"
                    : house === "Blue"
                    ? "#1c1c1c"
                    : house === "Orange"
                    ? "deepskyblue"
                    : "#6254de",
              },
            ]}
          >
            <Text
              style={{
                fontSize: moderateScale(50),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(10),
              }}
            >
              {10 - points}
            </Text>
            {points > 8 ? (
              <Text
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: "Ubuntu",
                  color: "white",
                  top: moderateScale(20),
                }}
              >
                Point Needed For
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: "Ubuntu",
                  color: "white",
                  top: moderateScale(20),
                }}
              >
                Points Needed For
              </Text>
            )}
            <Text
              style={{
                fontSize: moderateScale(24),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(25),
              }}
            >
              0.5 Leadership Credit
            </Text>
          </View>
        ) : points < 20 ? (
          <View
            style={[
              styles.square,
              {
                backgroundColor:
                  house === "Green"
                    ? "royalblue"
                    : house === "Blue"
                    ? "#1c1c1c"
                    : house === "Orange"
                    ? "deepskyblue"
                    : "#6254de",
              },
            ]}
          >
            <Text
              style={{
                fontSize: moderateScale(50),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(10),
              }}
            >
              {20 - points}
            </Text>
            {points > 18 ? (
              <Text
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: "Ubuntu",
                  color: "white",
                  top: moderateScale(20),
                }}
              >
                Point Needed For
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: "Ubuntu",
                  color: "white",
                  top: moderateScale(20),
                }}
              >
                Points Needed For
              </Text>
            )}
            <Text
              style={{
                fontSize: moderateScale(25),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(25),
              }}
            >
              1 Leadership Credit
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.square,
              {
                backgroundColor:
                  house === "Green"
                    ? "royalblue"
                    : house === "Blue"
                    ? "#1c1c1c"
                    : house === "Orange"
                    ? "deepskyblue"
                    : "#6254de",
              },
            ]}
          >
            <Text
              style={{
                fontSize: moderateScale(50),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(10),
              }}
            >
              Congrats!
            </Text>
            <Text
              style={{
                fontSize: moderateScale(25),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(20),
              }}
            >
              1 Leadership Credit
            </Text>
            <Text
              style={{
                fontSize: moderateScale(25),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(25),
              }}
            >
              Will Be Added
            </Text>
            <Text
              style={{
                fontSize: moderateScale(25),
                fontFamily: "Ubuntu",
                color: "white",
                top: moderateScale(25),
              }}
            >
              To Your Transcript
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: moderateScale(40),
  },
  divider: {
    marginTop: moderateScale(20),
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 11,
    width: "50%",
    height: moderateScale(10),
  },
  rectangle: {
    width: moderateScale(300),
    borderRadius: moderateScale(30),
    marginTop: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 11,
    flexDirection: "row",
    height: moderateScale(80),
  },
  circle: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginLeft: moderateScale(20),
    marginRight: moderateScale(15),
    borderWidth: moderateScale(4),
    borderRadius: moderateScale(100),
    borderColor: "#eb7cd8",
  },
  square: {
    width: moderateScale(300),
    borderRadius: moderateScale(35),
    marginTop: moderateScale(40),
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 11,
    height: moderateScale(170),
  },
});
