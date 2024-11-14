import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
      <ActivityIndicator size="large" className="text-white" />
    </View>
  );
};

export default Loader;
