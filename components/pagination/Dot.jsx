import { useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Dot = ({ index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      Math.abs(x.value),
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [10, 30, 10],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      Math.abs(x.value),
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  // const animatedColor = useAnimatedStyle(() => {
  //   const backgroundColor = interpolateColor(
  //     Math.abs(x.value),
  //     [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
  //     [
  //       data[1].backgroundColor,
  //       data[2].backgroundColor,
  //       data[0].backgroundColor,
  //     ]
  //   );

  //   return {
  //     backgroundColor: backgroundColor,
  //   };
  // });

  return (
    <Animated.View
      className="h-3 mx-2 rounded-full"
      style={[animatedDotStyle, { backgroundColor: "#ffffff" }]} //animatedColor
    />
  );
};

export default Dot;
