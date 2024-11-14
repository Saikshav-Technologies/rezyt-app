import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import FormField from "../components/form-field";
import icons from "../../constants/icons";
const Home = () => {
  const [form, setForm] = useState({
    search: "",
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mt-5 mr-10 ml-10 flex-row justify-center shadow-slate-800 items-center ">
          <FormField
            title="Password"
            value={form.search}
            placeholder="Search"
            otherStyles="bg-secondary text-black"
            keyboardType="default"
            secureTextEntry={true}
            icon={icons.search}
            iconStyles=""
            // onChangeText={(text: string) => handleInputChange("password", text)}
          />
        </View>

        <View>
          <Image
            source={icons.frame} // Replace with your image source
            className={`mt-5 h-[200px] w-full bg-secondary align-middle items-center`}
            resizeMode="cover"
          />
        </View>
        <View className="flex-row absolute items-center bottom-5 ml-5 mr-5">
          <Text className="text-white  text-sm font-extrabold w-[80%]">
            Deadpool and Wolverine
          </Text>



          <TouchableOpacity className=" text-white flex-row items-center  w-[20%] h-[50px] rounded-full  text-2xl font-bold text-center">
            <Image
              source={icons.play}
              resizeMode="contain"
              className="w-full h-full"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
