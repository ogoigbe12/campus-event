import { Redirect } from "expo-router";
import React from "react";
import {  View } from "react-native";

type Props = {};

const index = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Redirect href={'/landing'}/>
    </View>
  );
};

export default index;
