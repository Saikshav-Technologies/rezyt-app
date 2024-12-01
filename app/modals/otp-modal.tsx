import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { PropsWithChildren } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import icons from "../../constants/icons";
import { Image } from "react-native";
import OtpVerifiedModal from "./otp-verified-modal";
import Toast from "react-native-simple-toast";
import axios from "axios";
import { Endpoints } from "../services/endpoints";
import Loader from "../components/loader";
import { KeyboardAvoidingView } from "react-native";

interface OtpModalProps extends PropsWithChildren {
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  visible?: boolean;
  onRequestClose?: any;
  phone: string;
}

const OtpModal = ({
  transparent,
  animationType,
  visible,
  onRequestClose,
  phone,
}: OtpModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInputs, setOtpInputs] = useState<TextInput[]>([]);
  const sendDataToParent = () => {
    onRequestClose(otpVerified); // Call the parent's function with the data
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Toast.show("Please enter valid OTP", Toast.SHORT);
      return;
    }
    const data = {
      phone: phone,
      otp: otpString,
    };
    setIsLoading(true);
    axios
      .post(Endpoints.getBaseUrl() + Endpoints.OTP_VERIFY, data, {
        validateStatus: (status) => {
          return true;
        },
      })
      .then((response) => {
        if (response.status == 200) {
          Toast.show(response.data.message, Toast.SHORT);
          setOtpVerified(true);
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <Modal
        transparent={transparent}
        animationType={animationType}
        visible={visible}
        onRequestClose={sendDataToParent}
      >
        {!otpVerified && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View className="m-0 absolute top-5 right-5">
                <TouchableOpacity onPress={sendDataToParent}>
                  <Image source={icons.close} className="w-5 h-5" />
                </TouchableOpacity>
              </View>
              <Text className="text-2xl text-center mt-10 font-bold">
                OTP Verification
              </Text>

              <Text className="text-sm ml-2 text-secondary-100 mt-10">
                Enter the OTP sent to{" "}
                <Text className="font-bold">
                  {`+91-`}
                  {phone}
                </Text>
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
              <Text className="text-xs ml-2 text-center m-5 text-secondary-100">
                Didn't you receive the OTP?{" "}
                <Text className="text-primary font-bold">Resend OTP</Text>
              </Text>

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
        )}
        {otpVerified && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View className="m-0 absolute top-5 right-5">
                <TouchableOpacity onPress={sendDataToParent}>
                  <Image source={icons.close} className="w-5 h-5" />
                </TouchableOpacity>
              </View>
              <Text className="text-2xl text-center mt-10 font-bold">
                OTP Verified
              </Text>

              <View className="mt-10 justify-center items-center ">
                <Image
                  source={icons.otpVerified}
                  className="mx-auto justify-center items-center"
                />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </KeyboardAvoidingView>
  );
};

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

export default OtpModal;
