import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  loading?: boolean;
};

export default function Button({
  text,
  onPress,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
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
