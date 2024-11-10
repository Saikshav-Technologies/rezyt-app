import React from "react";
import { View, StyleSheet, Image } from "react-native";
import icons from "../../constants/icons";
const CircleView = () => {
  return (
    <View
      className=" justify-center items-center "
      style={styles.circle}
    >
      <View className="p-5" style={styles.innerCircle}>
        <Image
          source={icons.google}
          className="w-full h-full  justify-center items-center"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
  },
});

export default CircleView;
