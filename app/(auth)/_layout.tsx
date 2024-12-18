import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen
          name="otp"
          options={{ headerShown: true, title: "OTP Verification" }}
        />
        <Stack.Screen name="otp-register" options={{ headerShown: false }} />
        <Stack.Screen name="change-password" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#FFFFFF" style="light" />
    </>
  );
};

export default AuthLayout;
