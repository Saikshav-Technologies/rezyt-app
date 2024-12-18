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
import EmailValidation from "../utils/EmailValidation";
import MobileValidation from "../utils/MobileValidation";
import Otp from "./otp";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!MobileValidation(form.email)) {
        if (!EmailValidation(form.email)) {
          Toast.show("Please enter valid email or mobile number", Toast.SHORT);
          return;
        }
      }

      const data = {
        userType: "user",
        username: form.email,
      };

      if (!data.username) {
        Toast.show("Please enter email", Toast.SHORT);
        return;
      }
      setIsLoading(true);
      await axios
        .post(Endpoints.getBaseUrl() + Endpoints.FORGOT_PASSWORD, data, {
          validateStatus: (status) => {
            return true;
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setIsLoading(false);
            Toast.show(response.data.message, Toast.LONG);
            router.push({
              pathname: "/(auth)/otp",
              params: { username: form.email, userType: "user" },
            });
          } else {
            Toast.show(response.data.message, Toast.LONG);
          }
        })
        .catch((error) => {
          Toast.show("Please try again", Toast.LONG);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
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
            otherStyles="bg-secondary text-black w-[90%]"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.mail}
            onChangeText={(text: string) => handleInputChange("email", text)}
            iconStyles="w-[10%] h-6   bg-secondary align-middle items-center
            "
          />
          <View className="flex-row justify-start mt-5">
            <View>
              <Text className="text-secondary-100">
                We will send you a message to set or reset your new password
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10`}
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              handleSubmit();
            }}
          >
            {isLoading && <Loader />}
            <Text className="text-white text-2xl font-normal">
              {isLoading ? "" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ForgotPassword;
