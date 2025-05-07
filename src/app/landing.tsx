import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { Colors } from "../constants/Colors";

export default function LandingScreen() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("@/assets/images/login.png")}
        style={{
          width: "100%",
          height: 480,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.textStyle}>welcome to College CampusPulse</Text>
        <Text style={styles.textSmall}>
          Your College news, Updated in your pocket, join the club, Register for
          new event and many more
        </Text>
        <Button
          text="Get Started"
          onPress={() => router.push("/(auth)/SignUp")}
        />
        <Pressable onPress={() => router.push("/(auth)/SignIn")}>
          <Text style={styles.textSignIn}>
            Already have an account? Sign In Here{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textStyle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSmall: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 10,
    color: Colors.Gray,
  },
  textSignIn: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 7,
    color: Colors.Gray,
  },
});
