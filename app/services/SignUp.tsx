import axios from "axios";
import { Endpoints } from "./endpoints";
import { LoginRequest } from "../models/LoginRequest";
import LoginResponse from "../models/LoginResponse";
import Toast from "react-native-simple-toast";
const register = async (data: any): Promise<any> => {
  try {
    return await axios
      .post(Endpoints.getBaseUrl() + Endpoints.REGISTER, data, {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: (status) => {
          return true;
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status == 200) {
          Toast.show(response.data.message, Toast.LONG);
        } else {
          Toast.show(response.data.message, Toast.LONG);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

export default register;
