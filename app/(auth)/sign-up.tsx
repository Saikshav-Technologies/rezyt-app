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

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
            value={form.email}
            placeholder="Username or email"
            otherStyles="bg-secondary text-black"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.user}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
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
          />

          <View className="flex-row justify-start items-center mt-4">
            <TouchableOpacity
              onPress={() => setTermsAccepted(!termsAccepted)}
              className={`w-4 h-4 border-2 border-black rounded-sm ${
                termsAccepted ? "bg-primary" : ""
              }`}
            />
            <Text className="ml-2">I accept the terms and conditions</Text>
          </View>

          <View className=" h-full flex items-center w-full">
            <View className="mt-10">
              <Text className="text-black-200 mt-10 font-semibold ">
                Or continue with
              </Text>
            </View>

            <View className="flex-row justify-center items-center mt-5">
              <TouchableOpacity>
                <CircleView />
              </TouchableOpacity>
            </View>

            <Text className="text-black-200 mt-10 font-semibold">
              Create a Account{" "}
              <Link href="/(auth)/sign-in" className="text-primary">
                Sign In
              </Link>
            </Text>

            <CustomButton
              className=""
              otherStyles="mt-10 mb-10"
              title="Login"
              textStyles="text-white font-bold text-2xl"
              onPress={() => {
                router.navigate("/(tabs)/home");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
