import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/form-field";
import CustomButton from "../components/custom-button";
import icons from "../../constants/icons";
import { FaUserCircle } from "react-icons/fa";
import { Link, router } from "expo-router";
import CircleView from "../components/circle";
import Toast from "react-native-simple-toast";
import { Endpoints } from "../services/endpoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [form, setForm] = useState({
    userType: "user",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    console.log("button clicked");
    try {
      if (form.password !== form.confirmPassword) {
        Toast.show("Passwords do not match", Toast.LONG);
        return;
      }

      if (!termsAccepted) {
        Toast.show("Please accept terms and conditions", Toast.LONG);
        return;
      }
      const registerData = {
        userType: "user",
        email: form.email,
        password: form.password,
        firstname: form.firstName,
        lastname: form.lastName,
      };

      console.log("registerData", registerData);
      const response = await axios.post(
        Endpoints.getBaseUrl() + Endpoints.REGISTER,
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);
      if (response.status === 201) {
        Toast.show("Registration successful", Toast.LONG);
        router.replace("/sign-in");
        // Redirect to home screen
      } else {
        Toast.show("Registration failed, Please try again", Toast.LONG);
      }
    } catch (error) {
      // console.error(error);
      Toast.show("Registration failed, Please try again", Toast.LONG);
      // Toast.show(error, Toast.LONG);
    }
  };

  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
          <View className="w-full">
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Create an
            </Text>
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Account !
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.firstName}
            placeholder="First Name"
            otherStyles="bg-secondary text-black"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.user}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
            onChangeText={(text: any) => setForm({ ...form, firstName: text })}
          />

          <FormField
            title="Email"
            value={form.lastName}
            placeholder="Last Name"
            otherStyles="bg-secondary text-black"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.user}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
            onChangeText={(text: any) => setForm({ ...form, lastName: text })}
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Username or email"
            otherStyles="bg-secondary text-black"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.mail}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
            onChangeText={(text: any) => setForm({ ...form, email: text })}
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={true}
            icon={icons.password}
            iconStyles=""
            onChangeText={(text: any) => setForm({ ...form, password: text })}
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Confirm Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={true}
            icon={icons.password}
            iconStyles=""
            onChangeText={(text: any) =>
              setForm({ ...form, confirmPassword: text })
            }
          />

          <View className="flex-row justify-start items-center mt-4">
            <TouchableOpacity
              onPress={() => setTermsAccepted(!termsAccepted)}
              className={`w-4 h-4 border-2 border-black rounded-sm ${
                termsAccepted ? "bg-primary" : ""
              }`}
            />
            <Text className="ml-2 text-fontPrimary">
              I accept the terms and conditions
            </Text>
          </View>

          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={() => {
              // router.push("/(tabs)/home");
              handleSignUp();
              console.log(form);
            }}
          >
            <Text className="text-white text-2xl font-normal">
              Create Account
            </Text>
          </TouchableOpacity>
          <View className=" h-full flex items-center w-full">
            <View className="mt-10">
              <Text className="text-fontPrimary mt-10 font-light ">
                - Or continue with -
              </Text>
            </View>

            <View className="flex-row justify-center items-center mt-5">
              <TouchableOpacity>
                <CircleView />
              </TouchableOpacity>
            </View>

            <Text className="text-fontPrimary mt-10 font-normal mb-10">
              Already have an account{" "}
              <Link href="/(auth)/sign-in" className="text-primary">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
