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
import Toast from "react-native-simple-toast";
import axios from "axios";
import { Endpoints } from "../services/endpoints";

const Otp = () => {
  const [form, setForm] = useState({
    otp: "",
  });

  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async () => {
    try {
      setShowLoader(true);

      const data = {
        otp: form.otp,
      };

      if (!data.otp) {
        Toast.show("Please enter otp", Toast.SHORT);
        return;
      }

      await axios
        .post(Endpoints.getBaseUrl() + Endpoints.OTP, data, {
          validateStatus: (status) => {
            return true;
          },
        })
        .then((response) => {
          if (response.status == 200) {
            Toast.show("OTP verified", Toast.SHORT);
            router.push("/(tabs)/home");
          } else {
            Toast.show("Something went wrong", Toast.SHORT);
          }
        });
    } catch (e) {
      console.log(e);
    }

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
};

export default Otp;
