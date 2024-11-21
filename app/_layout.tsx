import "react-native-reanimated";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
