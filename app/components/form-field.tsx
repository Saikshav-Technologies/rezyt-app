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
  eyeIcon?: boolean;
  iconType?: string;
  eyeClick?: any;
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
  eyeIcon,
  iconType,
  eyeClick,
}: FormFieldProps) => {
  const [error, setError] = React.useState<string | null>(null);

  return (
    <View className="">
      <View className="w-full h-[55px] bg-secondary rounded-[5px] border-secondary-100 border justify-center mt-10  ">
        <View className="w-full justify-center items-center  flex-row">
          <Image
            source={icon}
            className={`w-[10%] h-6 justify-center  bg-secondary align-middle items-center ${iconStyles}`}
            resizeMode="contain"
          />
          <TextInput
            className={`text-black  w-[80%] ${otherStyles}`}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#676767"
            cursorColor={"#000000"}
            onChangeText={onChangeText}
          />

          {eyeIcon && (
            <TouchableOpacity
              style={{ width: "10%", height: "100%", justifyContent: "center" }}
              onPress={() => {
                eyeClick();
              }}
            >
              <Image
                source={secureTextEntry ? icons.eyeHide : icons.eye}
                style={{ width: 20, height: 20 }}
                className="justify-center   bg-secondary align-middle items-center"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text className="text-red-500 text-sm">{error}</Text>}
      </View>
    </View>
  );
};

export default FormField;
