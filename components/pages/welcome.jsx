import LottieView from "lottie-react-native";
import { useWindowDimensions, View } from "react-native";
import { Text } from "../CustomText";

const Welcome = ({ x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // const bgColor = useAnimatedStyle(() => {
  //   const backgroundColor = interpolateColor(
  //     Math.abs(x.value),
  //     [0, SCREEN_WIDTH, SCREEN_WIDTH * 2, SCREEN_WIDTH * 3],
  //     ["#c2d6f6", "#ffffff", "#c2d6f6", "#c2d6f6"]
  //   );
  //   return { backgroundColor };
  // });

  return (
    <View className="relative flex-1 py-64 items-center border">
      <Text className="text-white text-3xl text-center font-poppins-bold px-10">
        Kezdjük el megtervezni az osztálykirándulást! 🏕️
      </Text>
      <View
        // style={bgColor}
        className="absolute bottom-64 right-20 w-24 h-12 z-10"
      ></View>
      <View className="h-[340px] overflow-hidden">
        <View className="rounded-full overflow-hidden mt-20 w-4/5 aspect-square">
          <LottieView
            source={require("../../assets/animations/Artboard 2.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
