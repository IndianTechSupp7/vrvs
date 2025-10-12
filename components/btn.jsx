import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { cn } from "../lib/utils";

function Btn({ children: text, onPress, className, style }) {
  const padding = useSharedValue(15);
  const changeWidth = (val) => {
    padding.value = withSpring(val);
  };
  const animatePadding = useAnimatedStyle(() => ({
    paddingHorizontal: padding.value,
  }));
  return (
    <Animated.View
      style={[animatePadding, style]}
      className={cn(
        "bg-primary rounded-md h-min flex justify-center items-center ",
        className
      )}
    >
      <Pressable
        className="w-full flex items-center justify-center"
        onPressIn={() => changeWidth(20)}
        onPressOut={() => changeWidth(15)}
        onPress={onPress}
      >
        {text}
      </Pressable>
    </Animated.View>
  );
}

export default Btn;
