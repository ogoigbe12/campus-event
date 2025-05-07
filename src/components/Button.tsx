import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  text?: string;
  onPress?: () => void;
};

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    marginTop: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.WHITE,
  },
});
