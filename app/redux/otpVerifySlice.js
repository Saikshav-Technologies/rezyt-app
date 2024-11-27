import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpVerified: false,
};

const otpVerifySlice = createSlice({
  name: "otpVerify",
  initialState,
  reducers: {
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
  },
});

export const { setOtpVerified } = otpVerifySlice.actions;

export default otpVerifySlice.reducer;

