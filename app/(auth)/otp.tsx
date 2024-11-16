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
import { Link, router } from "expo-router";
import CircleView from "../components/circle";

const Otp = () => {
  const [form, setForm] = useState({
    otp: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
          <View className="w-full">
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Enter
            </Text>
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              OTP !
            </Text>
          </View>

          <FormField
            title="Otp"
            value={form.otp}
            placeholder="Enter OTP"
            otherStyles="bg-secondary text-black w-[90%]"
            keyboardType="number-pad"
            secureTextEntry={true}
            icon={icons.otp}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
          />
          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={() => {
              router.push("/(tabs)/home");
            }}
          >
            <Text className="text-white text-2xl font-normal">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;
