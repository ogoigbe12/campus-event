import Button from "@/src/components/Button";
import TextInputField from "@/src/components/TextInputField";
import {auth} from "@/src/config/FirebaseConfig";
import { Colors } from "@/src/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
// import {upload} from 'cloudinary-react-native';
// import { cld, options } from "@/src/config/CloudinaryConfig";

const Register = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  // const [confirmPassword, setConfirmPassword] = useState<string|undefined>();
  const onBrtPress = () => {
    if (!firstName ||!lastName || !email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.TOP);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredentials) => {
      console.log(userCredentials)
      // upload the profile image
      // await upload(cld,{
      //   file: profileImage,
      //   options:options,
      //   callback:async(error:any,response:any) => {
      //     if(error){
      //       console.log(error)
      //     } 
      //     if(response){
      //       console.log(response)
      //     }
      //   }
      // })

    }).catch((error) => {
      const errorCMessage = error?.message;
      ToastAndroid.show(errorCMessage, ToastAndroid.BOTTOM);
    })
    
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create New Account</Text>

      <View style={styles.imageContainer}>
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.imageStyle} />
            ) : (
              <Image
                source={require("@/assets/images/profile.png")}
                style={styles.imageStyle}
              />
            )}
            <Ionicons
              name="camera"
              size={24}
              color={Colors.PRIMARY}
              style={styles.iconStyle}
            />
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
}

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