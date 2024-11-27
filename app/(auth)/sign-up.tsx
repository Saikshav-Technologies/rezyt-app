import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/form-field";
import icons from "../../constants/icons";
import { FaUserCircle } from "react-icons/fa";
import { Link, router } from "expo-router";
import CircleView from "../components/circle";
import Toast from "react-native-simple-toast";
import { Endpoints } from "../services/endpoints";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/loader";
import EmailValidation from "../utils/EmailValidation";
import OtpRegister from "./otp-register";
import OtpModal from "../modals/otp-modal";
import OtpVerifiedModal from "../modals/otp-verified-modal";
import { Constants } from "../services/constants";
import register from "../services/SignUp";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] =
    useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = (status: boolean) => {
    if (status) {
      console.log("status", status);
    }
    setModalVisible(false);
  };
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [form, setForm] = useState({
    userType: "user",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleSignUp = async () => {
    try {
      if (!form.email || !form.password || !form.firstName || !form.lastName) {
        Toast.show("All fields are required", Toast.SHORT);
        return;
      }
      if (!EmailValidation(form.email)) {
        Toast.show("Please enter valid email", Toast.SHORT);
        return;
      }

      if (form.password !== form.confirmPassword) {
        Toast.show("Passwords do not match", Toast.LONG);
        return;
      }

      if (isOtpVerified === false) {
        Toast.show("Please verify your mobile number", Toast.LONG);
        return;
      }

      setIsLoading(true);
      const registerData = {
        userType: "user",
        email: form.email,
        password: form.password,
        firstname: form.firstName,
        lastname: form.lastName,
        mobile: form.mobile,
        isPhoneVerified: isOtpVerified,
      };

      const response = await axios.post(
        Endpoints.getBaseUrl() + Endpoints.REGISTER,
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        Toast.show("Registration successful", Toast.LONG);
        router.replace("/sign-in");
      } else {
        Toast.show("Registration failed, Please try again", Toast.LONG);
      }
    } catch (error) {
      Toast.show("Registration failed, Please try again", Toast.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!form.mobile) {
      Toast.show("Please enter mobile number", Toast.SHORT);
      return;
    }

    if (form.mobile.length !== 10) {
      Toast.show("Please enter valid mobile number", Toast.SHORT);
      return;
    }

    const data = {
      phone: form.mobile,
    };

    openModal();
    await axios
      .post(Endpoints.getBaseUrl() + Endpoints.OTP_REGISTER, data, {
        validateStatus: (status) => {
          return true;
        },
      })
      .then((response) => {
        if (response.status == 200) {
          Toast.show(response.data.message, Toast.LONG);
        } else {
          Toast.show(response.data.message, Toast.LONG);
        }

        setModalVisible(true);
      })
      .catch((error) => {
        Toast.show(Constants.SOMETHING_WENT_WRONG, Toast.LONG);
      });

    console.log(form.mobile);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [dataFromChild, setDataFromChild] = useState(false);

  // Callback function to handle data from the child
  useEffect(() => {
    console.log("Data from child:", dataFromChild);
    setIsOtpVerified(dataFromChild);
  }, [dataFromChild]);

  const handleChildData = (data: boolean) => {
    setDataFromChild(data);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="ml-10 mr-10 mt-10">
          <View className="w-full">
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Create an
            </Text>
            <Text className="text-black-100 text-6xl  font-extrabold  ">
              Account !
            </Text>
          </View>
          <View className="flex flex-row">
            <View className="w-[49%] mr-[1%]">
              <FormField
                title="Email"
                value={form.firstName}
                placeholder="First Name"
                otherStyles="bg-secondary text-black w-[80%]"
                keyboardType="email-address"
                secureTextEntry={false}
                icon={icons.user}
                iconStyles="w-[20%] h-6 justify-center bg-secondary align-middle items-center"
                onChangeText={(text: any) =>
                  setForm({ ...form, firstName: text })
                }
              />
            </View>
            <View className="w-[49%] ml-[1%] justify-end float-end bg-green">
              <FormField
                title="Email"
                value={form.lastName}
                placeholder="Last Name"
                otherStyles="bg-secondary text-black w-[78%]"
                keyboardType="email-address"
                secureTextEntry={false}
                icon={icons.user}
                iconStyles="w-[20%] h-6 justify-center bg-secondary align-middle items-center"
                onChangeText={(text: any) =>
                  setForm({ ...form, lastName: text })
                }
              />
            </View>

            <View className="w-1/2"></View>
          </View>

          <FormField
            title="Mobile Number"
            value={form.mobile}
            placeholder="Mobile Number"
            otherStyles="bg-secondary text-black w-[70%]"
            keyboardType="number-pad"
            secureTextEntry={false}
            icon={icons.phone}
            iconStyles=""
            eyeIcon={false}
            onVerify={handleVerification}
            onChangeText={(text: any) => setForm({ ...form, mobile: text })}
            verify={true}
            disabled={dataFromChild}
          />
          <OtpModal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={handleChildData}
            phone={form.mobile} // Android back button handler
          >
            {/* <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>This is the Modal!</Text>
                <Button title="Close" onPress={handleCloseModal} />
              </View>
            </View> */}
          </OtpModal>

          <FormField
            title="Email"
            value={form.email}
            placeholder="Email"
            otherStyles="bg-secondary text-black w-[90%]"
            keyboardType="email-address"
            secureTextEntry={false}
            icon={icons.mail}
            iconStyles="w-[10%] h-6 justify-center bg-secondary align-middle items-center"
            onChangeText={(text: any) => setForm({ ...form, email: text })}
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={secureTextEntryPassword}
            icon={icons.password}
            iconStyles=""
            eyeIcon={true}
            eyeClick={() =>
              setSecureTextEntryPassword(!secureTextEntryPassword)
            }
            onChangeText={(text: any) => setForm({ ...form, password: text })}
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Confirm Password"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={secureTextEntryConfirmPassword}
            icon={icons.password}
            iconStyles=""
            eyeIcon={true}
            eyeClick={() =>
              setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword)
            }
            onChangeText={(text: any) =>
              setForm({ ...form, confirmPassword: text })
            }
          ></FormField>

          <View className="flex-row justify-start items-center mt-4">
            <Text className="ml-2  text-secondary-100">
              {`By clicking the `}
              <Text className="text-blue-500">Create Account</Text>
              {` button, you agree to the public offer`}
            </Text>
          </View>

          <TouchableOpacity
            className={`bg-primary w-full  min-h-[51px] rounded-[5px] justify-center items-center mt-10 `}
            onPress={() => {
              handleSignUp();
            }}
          >
            {isLoading && <Loader />}
            <Text className="text-white text-2xl font-normal">
              {isLoading ? "" : "Create Account"}
            </Text>
          </TouchableOpacity>
          <View className=" h-full flex items-center w-full">
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
              Already have an account{" "}
              <Link href="/(auth)/sign-in" className="text-primary">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
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

export default SignUp;
