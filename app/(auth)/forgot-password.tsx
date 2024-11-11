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
import { images } from "../../constants";
import FormField from "../components/form-field";
import CustomButton from "../components/custom-button";
import icons from "../../constants/icons";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "expo-router";
import CircleView from "../components/circle";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
          <View className="w-full">
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Forgot
            </Text>
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Password !
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email address"
            otherStyles="bg-secondary text-secondary-100"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.mail}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
          />

          <View className="flex-row justify-start mt-5">
            <View>
              <Text className="text-secondary-100">
                We will send you a message to set or reset your new password
              </Text>
            </View>
          </View>

          <View className=" h-full flex items-center w-full ">
            <CustomButton
              className=""
              otherStyles="mt-10 mb-10"
              title="Submit"
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

export default ForgotPassword;
