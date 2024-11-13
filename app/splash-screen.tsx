// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Image, Text, StyleSheet } from "react-native";
// import SingIn from "./(auth)/sign-in";

// const SplashScreen = () => {
//   return (
//     <View className="flex justify-center h-full w-full items-center">
//       <Image
//         source={require("../assets/images/rezyt.png")}
//         resizeMode="contain"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });

// export default SplashScreen;

import React, { useState, useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

const SplashScreen = () => {
  const scale = new Animated.Value(0.5);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      className="flex justify-center h-full w-full items-center"
    >
      <Animated.Image
        source={require("../assets/images/rezyt.png")}
        style={[styles.image, { transform: [{ scale }] }]}
        resizeMode={"contain"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
