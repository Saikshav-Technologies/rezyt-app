import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { PropsWithChildren } from "react";
import icons from "../../constants/icons";

interface OtpModalProps extends PropsWithChildren {
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade";
  visible?: boolean;
  onRequestClose?: any;
}

const OtpVerifiedModal = ({
  transparent,
  animationType,
  visible,
  onRequestClose,
}: OtpModalProps) => {
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
            OTP Verified
          </Text>

          <View className="mt-10 justify-center items-center ">
            <Image
              source={icons.otpVerified}
              className="mx-auto justify-center items-center"
            />
          </View>

          {/* <Button title="Verify" onPress={onRequestClose} /> */}
        </View>
      </View>
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
export default OtpVerifiedModal;
