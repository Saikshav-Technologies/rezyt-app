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
import { Endpoints } from "../services/endpoints";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../components/loader";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const data = {
        userType: "user",
        email: form.email,
      };

      if (!data.email) {
        Toast.show("Please enter email", Toast.SHORT);
        return;
      }

      setIsLoading(true);

      await axios
        .post(Endpoints.getBaseUrl() + Endpoints.FORGOT_PASSWORD, data)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            setIsLoading(false);
            Toast.show("Please check your email", Toast.LONG);
            router.push("/(auth)/otp");
          }
        })
        .catch((error) => {          
          // console.error(error);
          Toast.show("Please try again", Toast.LONG);
        })
        .finally(() => {
          setIsLoading(false);
        });

      console.log(data);
    } catch (error) {
      // console.log(error);
      Toast.show("Something went wrong", Toast.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

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
            otherStyles="bg-secondary text-black"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.mail}
            onChangeText={(text: string) => handleInputChange("email", text)}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
          />

          <View className="flex-row justify-start mt-5">
            <View>
              <Text className="text-secondary-100">
                We will send you a message to set or reset your new password
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={() => {
              handleSubmit();
            }}
          >
            {/* {isLoading && (
              <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )} */}
            <Text className="text-white text-2xl font-normal">
              {isLoading ? <Loader /> : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
