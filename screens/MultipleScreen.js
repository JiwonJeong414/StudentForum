import { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import Checkmark from "../Components/Checkmark";
import moment from "moment";
import NumericInput from "react-native-numeric-input";

export default function MultipleScreen() {
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState(0);

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
    if (comment === "") {
      Alert.alert("Comment", "You need to put a comment first!");
    } else {
      const user = users.find((user) => user.id === id);
      if (user) user.points += amount;
      user.pointsHistory = [
        ...user.pointsHistory,
        { comment: comment, points: amount },
      ];
    }
  };

  const handleUndoTwo = (id) => {
    if (comment === "") {
      Alert.alert("Comment", "You need to put a comment first!");
    } else {
      const user = users.find((user) => user.id === id);
      if (user) user.points -= amount;
      user.pointsHistory.pop();
    }
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
            marginTop: moderateScale(80),
          }}
        >
          Select Multiple
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <NumericInput onChange={(value) => setAmount(value)} minValue={1} />
        <TextInput
          label="Comment"
          value={comment}
          mode="outlined"
          activeOutlineColor="#55BCF6"
          onChangeText={(text) => setComment(text)}
          style={{
            top: moderateScale(10),
            width: moderateScale(190),
            marginBottom: moderateScale(20),
          }}
        />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Checkmark
              item={item}
              handleAddTwo={handleAddTwo}
              handleUndoTwo={handleUndoTwo}
              comment={comment}
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
