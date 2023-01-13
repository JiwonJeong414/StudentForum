import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

const Checkmark = ({ item }) => {
  const [checkMark, showCheckMark] = useState(false);
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));

  const handleAdd = (id) => {
    showCheckMark(true);
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
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
    setTimeout(() => {
      handleAttendanceComment(id);
    }, 1000);
  };

  const handleAttendanceComment = (id) => {
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          user.pointsHistory = [
            ...user.pointsHistory,
            "Meeting Attended On " + today,
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
  };

  const handleUndo = (id) => {
    showCheckMark(false);
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          user.points -= 1;
          transaction.update(usersRef, { users });
        });
      })
      .then(() => {
        console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
      });

    setTimeout(() => {
      handleUndoComment(id);
    }, 1000);
  };

  const handleUndoComment = (id) => {
    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users").doc("Pink House");

    firestore
      .runTransaction((transaction) => {
        return transaction.get(usersRef).then((doc) => {
          let users = doc.data().users;
          let user = users.find((u) => u.id === id);
          user.pointsHistory.pop();
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: moderateScale(10) }}>
        {checkMark === false ? (
          <TouchableOpacity onPress={() => handleAdd(item.id)}>
            <View style={styles.box}></View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleUndo(item.id)}>
            <View style={styles.checkedBox}></View>
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: moderateScale(20) }}>
          {item.firstname + " " + item.lastname}
        </Text>
      </View>
    </View>
  );
};

export default Checkmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "gray",
    borderRadius: moderateScale(5),
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: moderateScale(5),
  },
  checkedBox: {
    backgroundColor: "blue",
    borderRadius: moderateScale(5),
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: moderateScale(5),
  },
});
