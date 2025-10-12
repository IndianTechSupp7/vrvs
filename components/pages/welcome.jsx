import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Text } from "../CustomText";

const Welcome = () => {
  return (
    <View className="flex-1 py-64 items-center border">
      <Text className="text-white text-3xl text-center font-poppins-bold px-10">
        Kezdjük el megtervezni az osztálykirándulást! 🏕️
      </Text>
      <View className="rounded-full overflow-hidden mt-20 w-4/5 aspect-square">
        <LottieView
          source={require("../../assets/animations/Man Planning A Sightseeing Route.json")}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Welcome;
