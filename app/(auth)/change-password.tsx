import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { isLoading } from "expo-font";
import { Link, router } from "expo-router";
import CircleView from "../components/circle";
import FormField from "../components/form-field";
import Loader from "../components/loader";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { Endpoints } from "../services/endpoints";

const ChangePassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] =
    useState(true);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const { username, userType } = useLocalSearchParams();

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSubmit = () => {
    try {
      if (form.password === "") {
        Toast.show("Please enter password", Toast.SHORT);
        return;
      }

      if (form.confirmPassword === "") {
        Toast.show("Please enter confirm password", Toast.SHORT);
        return;
      }

      if (form.password !== form.confirmPassword) {
        Toast.show("Passwords do not match", Toast.LONG);
        return;
      }

      setIsLoading(true);

      const data = {
        username: username,
        userType: userType,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      axios
        .post(Endpoints.getBaseUrl() + Endpoints.RESET_PASSWORD, data)
        .then((response) => {
          Toast.show(response.data.message, Toast.LONG);
          router.replace("/(auth)/sign-in");
        })
        .catch((error) => {
          Toast.show(error.response.data.message, Toast.LONG);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
          <View className="w-full">
            <Text className="text-black-100 text-6xl  font-extrabold  font-montserrat">
              Change
            </Text>
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Password !
            </Text>
          </View>

          <FormField
            title="Password"
            value={form.password}
            placeholder="Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={secureTextEntry}
            icon={icons.password}
            iconStyles=""
            eyeIcon={true}
            onChangeText={(text: any) => setForm({ ...form, password: text })}
            iconType="showPassword"
            eyeClick={() =>
              setSecureTextEntryPassword(!secureTextEntryPassword)
            }
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={secureTextEntry}
            icon={icons.password}
            iconStyles=""
            eyeIcon={true}
            onChangeText={(text: any) =>
              setForm({ ...form, confirmPassword: text })
            }
            iconType="showPassword"
            eyeClick={() =>
              setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword)
            }
          />

          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={handleSubmit}
          >
            {isLoading && <Loader />}
            <Text className="text-white text-2xl font-normal">
              {isLoading ? "" : "Change Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
