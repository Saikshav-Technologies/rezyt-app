import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
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
import { StyleSheet } from "react-native";
import Loader from "../components/loader";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import { maskUsername } from "../utils/Utils";

const Otp = ({ phone }: { phone: string }) => {
  const [form, setForm] = useState({
    otp: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [otpInputs, setOtpInputs] = useState<TextInput[]>([]);

  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  const resendOtp = () => {
    axios
      .post(Endpoints.getBaseUrl() + Endpoints.FORGOT_PASSWORD, {
        username: local.username,
        userType: local.userType,
      })
      .then((response) => {
        if (response.status == 200) {
          Toast.show(response.data.message, Toast.SHORT);
        } else {
          Toast.show(response.data.message, Toast.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const handleVerify = () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      Toast.show("Please enter valid OTP", Toast.SHORT);
      return;
    }
    const data = {
      username: local.username,
      userType: local.userType,
      token: otpString,
    };
    setIsLoading(true);
    axios
      .post(Endpoints.getBaseUrl() + Endpoints.VERIFY_FORGOT_OTP, data, {
        validateStatus: (status) => {
          return true;
        },
      })
      .then((response) => {
        if (response.status == 200) {
          Toast.show(response.data.message, Toast.SHORT);
          router.push({
            pathname: "/(auth)/change-password",
            params: {
              username: local.username,
              userType: local.userType,
            },
          });
        } else {
          Toast.show(response.data.message, Toast.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View>
          <View>
            <View className="mt-10 justify-center items-center ">
              <Image
                source={icons.otpVerified}
                className="mx-auto justify-center items-center"
              />
            </View>
          </View>

          <View>
            <Text className="text-[16px] text-center mt-10 text-secondary-100 ">
              Enter the OTP sent to
            </Text>
            <Text className="text-[16px] font-bold text-center mt-5 text-secondary-100">
              {maskUsername(local.username.toString())}
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => {
                    const newOtp = [...otp];
                    newOtp[index] = text;
                    setOtp(newOtp);
                  }}
                  onKeyPress={(event) => {
                    if (event.nativeEvent.key === "Backspace") {
                      if (index > 0) {
                        otpInputs[index - 1]?.focus();
                      }
                    } else if (index < otp.length - 1) {
                      otpInputs[index + 1]?.focus();
                    }
                  }}
                  ref={(input) => {
                    otpInputs[index] = input ?? null;
                  }}
                />
              ))}
            </View>
            <View className="flex-row justify-center">
              <Text className="text-[14px] ml-2 text-center mt-5 mr-2  text-secondary-100">
                Didn't you receive the OTP?{""}
              </Text>
              <TouchableOpacity onPress={resendOtp}>
                <Text className="text-[14px] mt-5 mb-5 text-primary font-bold">
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="bg-primary w-[80%] min-h-[45px] rounded-[5px] justify-center items-center mt-5"
                onPress={handleVerify}
              >
                {isLoading && <Loader />}
                <Text className="text-white text-2xl font-normal">
                  {isLoading ? "" : "Verify"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  button: {
    padding: 15,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    margin: 40,
    marginTop: 20,
  },
  otpInput: {
    width: 35,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "60%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
});
