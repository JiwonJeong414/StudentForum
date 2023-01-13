import { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import Checkmark from "../Components/Checkmark";
import moment from "moment";

export default function AttendanceScreen() {
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();
  const firestore = firebase.firestore();

  useEffect(() => {
    const pinkHouseRef = firebase
      .firestore()
      .collection("users")
      .doc("Pink House");
    pinkHouseRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setUsers(snapshot.data().users);
      } else {
        console.log("Pink House document does not exist");
      }
    });
  }, []);

  const handleAddTwo = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) user.points += 1;
    user.pointsHistory = [...user.pointsHistory, "Meeting Attended " + today];
  };

  const handleUndoTwo = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) user.points -= 1;
    user.pointsHistory.pop();
  };

  const handleDone = () => {
    const pinkHouseRef = firestore.collection("users").doc("Pink House");

    pinkHouseRef
      .update({
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
    <View styles={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: moderateScale(20),
            marginBottom: moderateScale(20),
            marginTop: moderateScale(20),
          }}
        >
          Attendance For {today}
        </Text>
      </View>
      <FlatList
        data={users}
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
      />
      <View style={{ alignItems: "center" }}>
        <Button
          mode="contained"
          style={{
            marginBottom: moderateScale(20),
            marginTop: moderateScale(20),
            width: moderateScale(120),
            height: moderateScale(40),
          }}
          onPress={handleDone}
        >
          Done
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
