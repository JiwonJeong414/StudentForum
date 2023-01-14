import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View, Alert } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import NumericInput from "react-native-numeric-input";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const [modal, showModal] = useState(false);
  const [comment, setComment] = useState("");
  const [tempid, setTempid] = useState("");
  const [amount, setAmount] = useState(1);

  const navigation = useNavigation();
  const firestore = firebase.firestore();

  // updates automatically when incrementing on firebase
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc("Pink House")
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setUsers(snapshot.data().users);
        } else {
          console.log("Pink House document does not exist");
        }
      });
    return () => unsubscribe();
  }, []);

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

  const onModalPress = (id) => {
    showModal(true);
    console.log("id: " + id);
    setTempid(id);
  };

  const onAddPress = (id) => {
    const usersRef = firestore.collection("users").doc("Pink House");
    console.log("id: " + id);

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          console.log("user: " + user.id);
          user.points += amount;
          transaction.update(usersRef, { users });
        });
      })
      .then(() => {
        console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
      });
  };

  const handleAdd = (id) => {
    if (comment === "") {
      Alert.alert("Comment", "You need to put in a comment!");
    } else {
      showModal(false);
      const usersRef = firestore.collection("users").doc("Pink House");
      console.log("iddef: " + id);

      firestore
        .runTransaction((transaction) => {
          return transaction.get(usersRef).then((doc) => {
            let users = doc.data().users;
            let user = users.find((u) => u.id === id);
            user.pointsHistory = [
              ...user.pointsHistory,
              { comment: comment, points: amount },
            ];
            transaction.update(usersRef, { users });
          });
        })
        .then(() => {
          console.log("Transaction successfully committed!");
        })
        .catch((error) => {
          console.log("Transaction failed: ", error);
        });
      setComment("");
      setTimeout(() => {
        onAddPress(id);
      }, 1000);
    }
  };

  const handleAttendance = () => {
    navigation.navigate("Attendance");
  };

  const handleMultiple = () => {
    navigation.navigate("Multiple");
  };

  return (
    <View styles={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Button
            mode="contained"
            style={{
              marginRight: moderateScale(40),
              marginBottom: moderateScale(10),
              marginTop: moderateScale(50),
              marginLeft: moderateScale(20),
              width: moderateScale(140),
              height: moderateScale(45),
              justifyContent: "center",
            }}
            labelStyle={{
              fontSize: moderateScale(18),
            }}
            onPress={handleAttendance}
          >
            Attendance
          </Button>
          <Button
            mode="contained"
            style={{
              marginRight: moderateScale(20),
              marginBottom: moderateScale(10),
              marginTop: moderateScale(50),
              marginLeft: moderateScale(20),
              width: moderateScale(140),
              height: moderateScale(45),
              justifyContent: "center",
            }}
            labelStyle={{
              fontSize: moderateScale(18),
            }}
            onPress={handleMultiple}
          >
            Multiple
          </Button>
        </View>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                mode="contained"
                style={{
                  backgroundColor: "#55BCF6",
                  marginRight: moderateScale(10),
                  marginBottom: moderateScale(10),
                  top: moderateScale(5),
                  marginLeft: moderateScale(20),
                  width: moderateScale(90),
                  height: moderateScale(45),
                  justifyContent: "center",
                }}
                labelStyle={{
                  fontSize: moderateScale(23),
                }}
                onPress={() => onModalPress(item.id, item.points)}
              >
                +
              </Button>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: moderateScale(20),
                    fontFamily: "RobotBold",
                  }}
                >
                  {item.firstname + " " + item.lastname}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: moderateScale(22),
                    fontFamily: "Ubuntu",
                  }}
                >
                  Points: {item.points}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: moderateScale(338),
                left: moderateScale(20),
                height: moderateScale(1),
                backgroundColor: "gray",
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
        isVisible={modal}
        animationIn="bounceIn"
        animationOut="bounceOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => showModal(false)}
        style={styles.modalBackground}
      >
        <View style={styles.modalHeader}>
          <View style={styles.modal}>
            <Text
              style={{
                color: "white",
                fontSize: moderateScale(20),
              }}
            >
              Add Point
            </Text>
          </View>
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
          <NumericInput onChange={(value) => setAmount(value)} minValue={1} />
          <Button
            mode="contained"
            onPress={() => handleAdd(tempid)}
            style={{
              position: "absolute",
              left: moderateScale(195),
              top: moderateScale(215),
              backgroundColor: "#55BCF6",
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
