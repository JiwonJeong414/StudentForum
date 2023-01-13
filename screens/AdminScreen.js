import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const [modal, showModal] = useState(false);
  const [comment, setComment] = useState("");
  const [tempid, setTempid] = useState("");

  const navigation = useNavigation();

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
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");
    console.log("id: " + id);

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          console.log("user: " + user.id);
          user.points += 1;
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
    showModal(false);
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");
    console.log("iddef: " + id);

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          user.pointsHistory = [...user.pointsHistory, comment];
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
  };

  const handleAttendance = () => {
    navigation.navigate("Attendance");
  };

  return (
    <View styles={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          mode="contained"
          style={{
            marginBottom: moderateScale(20),
            marginTop: moderateScale(20),
            width: moderateScale(180),
            height: moderateScale(40),
          }}
          onPress={handleAttendance}
        >
          Take Attendance
        </Button>
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
                }}
                onPress={() => onModalPress(item.id, item.points)}
              >
                Add Point
              </Button>
              <Text style={{ fontWeight: "bold", fontSize: moderateScale(16) }}>
                Name: {item.firstname + " " + item.lastname + ", "}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: moderateScale(16) }}>
                Points: {item.points}
              </Text>
            </View>
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
