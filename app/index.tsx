import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SplashScreen from "./splash-screen";
import SingIn from "./(auth)/sign-in";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <>
        <View className="">
          <SplashScreen />
        </View>
      </>
    );
  } else {
    return <SingIn />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
