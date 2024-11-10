import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { KeyboardTypeOptions } from "react-native";
import icons from "../../constants/icons";
import { FaUserCircle } from "react-icons/fa";

const FormField = ({
  title,
  value,
  otherStyles,
  keyboardType,
  secureTextEntry,
  placeholder,
  icon,
  iconStyles,
}: {
  title: string;
  value: string;
  otherStyles: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
  placeholder: string;
  icon: string;
  iconStyles: string;
}) => {
  return (
    <View className="">
      <View className="w-full h-[55px] bg-secondary rounded-[5px] border-secondary-100 border justify-center mt-10  ">
        <View className="w-full justify-center items-center  flex-row">
          <Image
            source={icon} // Replace with your image source
            className={`w-[10%] h-6 justify-center bg-secondary align-middle items-center ${iconStyles}`}
            resizeMode="contain"
          />
          {/* </Image> */}
          <TextInput
            className={`text-black  w-[90%] ${otherStyles}`}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#000000"
            cursorColor={"#000000"}
          />
        </View>

        {/* <TextInput
          className={`text-black rounded-[5px] w-full ${otherStyles}`}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#000000"
        >
        </TextInput> */}
      </View>
    </View>
  );
};

export default FormField;

// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import React from "react";
// import { KeyboardTypeOptions } from "react-native";
// import { FaUserCircle } from "react-icons/fa";
// import { Svg, SvgXml } from "react-native-svg";

// const FormField = ({
//   title,
//   value,
//   otherStyles,
//   keyboardType,
//   secureTextEntry,
//   placeholder,
//   icon,
// }: {
//   title: string;
//   value: string;
//   otherStyles: string;
//   keyboardType: KeyboardTypeOptions;
//   secureTextEntry: boolean;
//   placeholder: string;
//   icon: string;
// }) => {
//   return (
//     <View className="">
//       <View className="w-full h-[51px] bg-secondary rounded-[5px] border-secondary-100 border justify-center mt-4  ">
//         <View className="w-full justify-center items-center  flex-row">
//           <View className="w-[10%] h-6 justify-center bg-secondary align-middle items-center">
//             <SvgXml xml={FaUserCircle.toString()} width="24" height="24" />
//           </View>
//           <TextInput
//             className={`text-black  w-[90%] ${otherStyles}`}
//             secureTextEntry={secureTextEntry}
//             keyboardType={keyboardType}
//             placeholder={placeholder}
//             placeholderTextColor="#000000"
//           />
//         </View>

//         {/* <TextInput
//           className={`text-black rounded-[5px] w-full ${otherStyles}`}
//           secureTextEntry={secureTextEntry}
//           keyboardType={keyboardType}
//           placeholder={placeholder}
//           placeholderTextColor="#000000"
//         >
//         </TextInput> */}
//       </View>
//     </View>
//   );
// };

// export default FormField;
