import Button from "@/src/components/Button";
import TextInputField from "@/src/components/TextInputField";
import { auth } from "@/src/config/FirebaseConfig";
import { Colors } from "@/src/constants/Colors";
import axios from "axios";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  // const { user, setUser } = useContext(AuthContext);

  const onSignInBtn = () => {
    if (!email || !password) {
      ToastAndroid.show("Enter email and password", ToastAndroid.TOP);
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        if (resp.user) {
          console.log(resp.user?.email);
          const result = await axios.get(
            process.env.EXPO_PUBLIC_HOST_URL + "/user?email=" + resp.user?.email
          );
          console.log(result.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error signing in:", err);
        ToastAndroid.show("Invalid email or password", ToastAndroid.BOTTOM);
      });
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.text}>Sign In To College Campus</Text>
      </View>
      <TextInputField label="Email" onChangeText={(v) => setEmail(v)} />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={(v) => setPassword(v)}
      />

      <Button text="Sign In" onPress={() => onSignInBtn()} loading={loading} />
      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.textSignIn}>
          New to College Campus app, create new account Here
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 250,
    height: 250,
    borderRadius: 99,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
  },
  textSignIn: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 7,
    color: Colors.Gray,
  },
});
export default Login;
