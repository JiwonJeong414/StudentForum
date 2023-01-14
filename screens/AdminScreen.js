import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View, Alert, Image } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "react-native-modal";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/core";
import NumericInput from "react-native-numeric-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);
  const [modal, showModal] = useState(false);
  const [comment, setComment] = useState("");
  const [tempid, setTempid] = useState("");
  const [amount, setAmount] = useState(1);
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

  // updates automatically when incrementing on firebase
  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(document)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setUsers(snapshot.data().users);
        } else {
          console.log(document + " document does not exist");
        }
      });
    return () => unsubscribe();
  }, [houseColor]);

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

  const onModalPress = (id) => {
    showModal(true);
    console.log("id: " + id);
    setTempid(id);
  };

  const onAddPress = (id) => {
    const usersRef = firestore.collection("users").doc(document);
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
      let idd = uuid.v4().toString();
      showModal(false);
      const usersRef = firestore.collection("users").doc(document);
      console.log("iddef: " + id);

      firestore
        .runTransaction((transaction) => {
          return transaction.get(usersRef).then((doc) => {
            let users = doc.data().users;
            let user = users.find((u) => u.id === id);
            user.pointsHistory = [
              ...user.pointsHistory,
              { comment: comment, points: amount, id: idd },
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
    <View style={styles.container}>
      <FlatList
        data={users}
        ListHeaderComponent={
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "RobotBold",
                fontSize: moderateScale(40),
                marginTop: moderateScale(60),
              }}
            >
              {houseColor} House
            </Text>
            <Image
              style={{
                width: moderateScale(190),
                height: moderateScale(190),
                marginTop: moderateScale(10),
                marginBottom: moderateScale(-20),
              }}
              source={require("../assets/images/sf-logo.png")}
            />
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
                  fontFamily: "Ubuntu",
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
                  fontFamily: "Ubuntu",
                }}
                onPress={handleMultiple}
              >
                Multiple
              </Button>
            </View>
          </View>
        }
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
        ListFooterComponent={
          <View style={{ marginBottom: moderateScale(70) }}></View>
        }
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
                fontFamily: "Robot",
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
              left: moderateScale(175),
              top: moderateScale(210),
              width: moderateScale(80),
              height: moderateScale(35),
              backgroundColor: "#55BCF6",
            }}
            labelStyle={{
              fontSize: moderateScale(18),
              fontFamily: "Robot",
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
