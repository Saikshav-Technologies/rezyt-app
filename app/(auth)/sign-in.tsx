import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-simple-toast";
import Loader from "../components/loader";
import EmailValidation from "../utils/EmailValidation";

const SingIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  interface LoginData {
    email: string;
    password: string;
    userType: string;
  }

  interface LoginResponse {
    data: any;
    token: string;
  }

  const handleLogin = async () => {
    try {
      const loginData: LoginData = {
        email: form.email,
        password: form.password,
        userType: "user",
      };

      if (!loginData.email || !loginData.password) {
        Toast.show("Please enter email and password", Toast.SHORT);
        return;
      }

      if (!EmailValidation(loginData.email)) {
        Toast.show("Please enter valid email", Toast.SHORT);
        return;
      }

      setIsLoading(true);
      await axios
        .post<LoginResponse>(
          Endpoints.getBaseUrl() + Endpoints.LOGIN,
          loginData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setIsLoading(false);
          let accessToken: string = "";
          if (response.status == 200) {
            accessToken = response.data.data.token;
          }
          if (response.data.data.status == "error") {
            Toast.show(response.data.data.message, Toast.LONG);
          }
          return accessToken;
        })
        .then(async (accessToken) => {
          try {
            await AsyncStorage.setItem("token", accessToken);
            router.replace("/(tabs)/home");
          } catch (error) {
            Toast.show("Something went wrong, Please try again", Toast.LONG);
            console.error("Error storing token:", error);
          }
        })
        .catch((error) => {
          Toast.show("Invalid Credentials", Toast.LONG);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      Toast.show("Something went wrong, Please try again", Toast.LONG);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
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
            otherStyles="bg-secondary text-black w-[90%]"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.user}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
            onChangeText={(text: string) => handleInputChange("email", text)}
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
            onChangeText={(text: string) => handleInputChange("password", text)}
            iconType="showPassword"
            eyeClick={toggleSecureEntry}
          />

          <View className="flex-row justify-end mt-5">
            <View>
              <Link href="/(auth)/forgot-password" className="text-primary">
                Forgot Password ?
              </Link>
            </View>
          </View>
          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={() => {
              handleLogin();
            }}
          >
            {isLoading && <Loader />}
            <Text className="text-white text-2xl font-normal">
              {isLoading ? "" : "Login"}
            </Text>
          </TouchableOpacity>
          <View className=" h-full flex items-center w-full ">
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
              Create An Account{" "}
              <Link href="/(auth)/sign-up" className="text-primary">
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;
