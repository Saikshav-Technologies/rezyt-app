// my-app/app/components/form-field.tsx
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { KeyboardTypeOptions } from "react-native";
import icons from "../../constants/icons";
import { FaUserCircle } from "react-icons/fa";

interface FormFieldProps {
  title: string;
  value: string;
  otherStyles: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  placeholder: string;
  icon: any;
  iconStyles: string;
  validate?: (value: string) => string | null;
  onChangeText?: any;
}

const FormField = ({
  title,
  value,
  otherStyles,
  keyboardType,
  secureTextEntry,
  placeholder,
  icon,
  iconStyles,
  validate,
  onChangeText,
}: FormFieldProps) => {
  const [error, setError] = React.useState<string | null>(null);

  // const onChangeText = (text: string) => {
  //   if (validate) {
  //     const error = validate(text);
  //     setError(error);
  //   }
  // };

  return (
    <View className="">
      <View className="w-full h-[55px] bg-secondary rounded-[5px] border-secondary-100 border justify-center mt-10  ">
        <View className="w-full justify-center items-center  flex-row">
          <Image
            source={icon} // Replace with your image source
            className={`w-[10%] h-6 justify-center  bg-secondary align-middle items-center ${iconStyles}`}
            resizeMode="contain"
          />
          <TextInput
            className={`text-black  w-[90%] ${otherStyles}`}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#676767"
            cursorColor={"#000000"}
            onChangeText={onChangeText}
          />
        </View>

        {error && <Text className="text-red-500 text-sm">{error}</Text>}
      </View>
    </View>
  );
};

export default FormField;
