import { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import Checkmark from "../Components/Checkmark";
import moment from "moment";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AttendanceScreen() {
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [users, setUsers] = useState([]);
  const [houseColor, setHouseColor] = useState("");

  const navigation = useNavigation();
  const firestore = firebase.firestore();

  let document = houseColor + " " + "House";

  useEffect(() => {
    const retireveAdminColor = async () => {
      let retrieveData = await AsyncStorage.getItem("Admin");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setHouseColor(retrieveData);
      else setHouseColor(retrieveData);
    };
    retireveAdminColor();
  }, []);

  useEffect(() => {
    const HouseRef = firestore.collection("users").doc(document);
    HouseRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setUsers(snapshot.data().users);
      } else {
        console.log(document + " document does not exist");
      }
    });
  }, [houseColor]);

  const handleAddTwo = (id) => {
    let idd = uuid.v4().toString();
    const user = users.find((user) => user.id === id);
    if (user) user.points += 1;
    user.pointsHistory = [
      ...user.pointsHistory,
      { comment: "Meeting Attended " + today, points: 1, id: idd },
    ];
  };

  const handleUndoTwo = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) user.points -= 1;
    user.pointsHistory.pop();
  };

  const handleDone = () => {
    const HouseRef = firestore.collection("users").doc(document);
    HouseRef.update({
      users: users,
    })
      .then(() => {
        console.log("Users array updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating users array: ", error);
      });
    navigation.navigate("Admin");
  };

  // 10 points = .5 Leadership Credit
  // 20 points = 1 Leadership Credit

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        ListHeaderComponent={
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: moderateScale(25),
                marginBottom: moderateScale(20),
                marginTop:
                  Platform.OS === "ios" ? moderateScale(55) : moderateScale(30),
                fontFamily: "RobotBold",
              }}
            >
              Attendance For {today}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <Checkmark
              item={item}
              handleAddTwo={handleAddTwo}
              handleUndoTwo={handleUndoTwo}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            <Button
              mode="contained"
              style={{
                marginRight: moderateScale(40),
                marginBottom: moderateScale(80),
                marginTop: moderateScale(20),
                marginLeft: moderateScale(20),
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
              Done
            </Button>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: moderateScale(270),
    height: moderateScale(260),
    backgroundColor: "#FFF",
  },
  modal: {
    position: "absolute",
    width: "100.4%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(50),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
});
