import Button from "@/src/components/Button";
import TextInputField from "@/src/components/TextInputField";
import { auth } from "@/src/config/FirebaseConfig";
import { Colors } from "@/src/constants/Colors";
// import { AuthContext } from "@/src/context/AuthContext"; // Adjust the path as needed
import axios from "axios";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
// import {upload} from 'cloudinary-react-native';
// import { cld, options } from "@/src/config/CloudinaryConfig";

const Register = () => {
  // const [profileImage, setProfileImage] = useState<string | undefined>();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useContext(AuthContext);
  const router = useRouter();

  const onBrtPress = () => {
    if (!firstName || !lastName || !email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.TOP);
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        try {
          const response = await axios.post(
            process.env.EXPO_PUBLIC_HOST_URL + "/user",
            {
              firstName,
              lastName,
              email,
            }
          );
          console.log(response.data); // Only log the data portion
          router.push("/landing");
        } catch (err: any) {
          console.log("Axios error:", err?.message || err);
          ToastAndroid.show("Failed to save user data", ToastAndroid.BOTTOM);
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        const errorMessage = error?.message || "Registration error";
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create New Account</Text>

      <View style={styles.imageContainer}>
        <View>
          <TouchableOpacity
          // onPress={() => pickImage()}
          >
            {/* {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.imageStyle} />
            ) : ( */}
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.imageStyle}
            />
            {/* )} */}
            {/* <Ionicons
              name="camera"
              size={24}
              color={Colors.PRIMARY}
              style={styles.iconStyle}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
      <TextInputField label="FirstName" onChangeText={(v) => setFirstName(v)} />
      <TextInputField label="LastName" onChangeText={(v) => setLastName(v)} />
      <TextInputField label="Email" onChangeText={(v) => setEmail(v)} />
      <TextInputField
        label="Password"
        password={true}
        onChangeText={(v) => setPassword(v)}
      />

      <Button text="Create Account" onPress={() => onBrtPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    padding: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
  iconStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    padding: 5,
  },
});

export default Register;
