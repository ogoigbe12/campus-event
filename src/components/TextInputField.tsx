import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../constants/Colors";

type TextInputFieldProps = {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
};

export default function TextInputField({
  label,
  onChangeText,
  password = false,
}: TextInputFieldProps) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: Colors.Gray }}>{label}</Text>
      <TextInput placeholder={label} style={styles.textInput} secureTextEntry={password}
      onChangeText={onChangeText}/>

    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 0.3,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 17,
  },
});
