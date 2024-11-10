import {
    View,
    Text,
    ScrollView,
    Image,
    Touchable,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { images } from "../constants";
  import FormField from "./components/form-field";
  import CustomButton from "./components/custom-button";
  import icons from "../constants/icons";
  import { FaUserCircle } from "react-icons/fa";
  import { Link } from "expo-router";
  import CircleView from "./components/circle";
  
  const SingIn = () => {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
  
    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View className="ml-10 mr-10">
            <View className="w-full">
              <Text className="text-black-100 text-6xl  font-extrabold  ">
                Welcome
              </Text>
              <Text className="text-black-100 text-6xl  font-extrabold  ">
                Back !
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
  
            <View className="flex-row justify-end mt-5">
              <View>
                <Text className="text-primary">Forgot Password?</Text>
              </View>
            </View>
  
            <View className=" h-full flex items-center w-full ">
              <View className="mt-10">
                <Text className="text-black mt-10 font-semibold ">
                  Or continue with
                </Text>
              </View>
  
              <View className="flex-row justify-center items-center mt-5">
                <TouchableOpacity>
                  <CircleView />
                </TouchableOpacity>
              </View>
  
              <Text className="text-black mt-10 font-semibold">
                Create a Account{" "}
                <Link href="/(auth)/sign-up" className="text-primary">
                  Sign Up
                </Link>
              </Text>
  
              <CustomButton
                className=""
                otherStyles="mt-10"
                title="Login"
                textStyles="text-white font-bold text-2xl"
                onPress={() => {
                  console.log(form);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SingIn;
  