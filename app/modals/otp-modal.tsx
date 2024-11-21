import { View, Text, Modal, Button, StyleSheet } from "react-native";
import React from "react";
import { PropsWithChildren } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import icons from "../../constants/icons";
import { Image } from "react-native";
import OtpVerifiedModal from "./otp-verified-modal";

interface OtpModalProps extends PropsWithChildren {
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  visible?: boolean;
  onRequestClose?: any;
  phone: string
}

const OtpModal = ({
  transparent,
  animationType,
  visible,
  onRequestClose,
  phone
}: OtpModalProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleVerify = () => {
    //open otp modal
    setModalVisible(true);
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  return (
    <Modal
      transparent={transparent}
      animationType={animationType}
      visible={visible}
      onRequestClose={onRequestClose} // Android back button handler
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View className="m-0 absolute top-5 right-5">
            <TouchableOpacity onPress={onRequestClose}>
              <Image source={icons.close} className="w-5 h-5" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl text-center mt-10 font-bold">
            OTP Verification
          </Text>

          <Text className="text-sm ml-2 text-secondary-100 mt-10">
            Enter the OTP sent to <Text className="font-bold">{`+91-`}{phone}</Text>
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
              <Text className="text-white">Verify</Text>
            </TouchableOpacity>
          </View>
          {/* <Button title="Verify" onPress={onRequestClose} /> */}
        </View>
      </View>
      <OtpVerifiedModal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      ></OtpVerifiedModal>
    </Modal>
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
