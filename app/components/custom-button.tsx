import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  otherStyles,
  textStyles,
  isLoading,
}: any) => {
  return (
    <TouchableOpacity
      className={`bg-primary w-full  min-h-[51px] rounded-full justify-center items-center mt-10 ${otherStyles}`}
      onPress={handlePress}
    >
      <Text className={`${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
