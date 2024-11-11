import "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }

  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ headerShown: false }} />
    // </Stack>
    <>
      {/* <View
        className="align-items-center justify-center flex-1 align-middle"
        style={styles.container}
      >
        <Text>RootLayout</Text>
      </View> */}
      {/* <View style={styles.container}>
        <Text>Header</Text>
        <Slot />
        <Text>Footer</Text>
      </View> */}

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="sign-in" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
}
