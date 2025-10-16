import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  clamp,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import Btn from "../components/btn";
import { Text } from "../components/CustomText";
import PageManager from "../components/PageManager";
import Options from "../components/pages/Options";
import Students from "../components/pages/Students";
import TripCost from "../components/pages/TripCost";
import Welcome from "../components/pages/welcome";
import Pagination from "../components/pagination/Pagination";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function Index() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const managerRef = useRef(null);
  const x = useSharedValue(0);
  const bounce = useSharedValue(0);
  const [currentiIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const max = useSharedValue(0);
  const min = useSharedValue(0);

  useEffect(() => {
    const c = managerRef.current;
    max.value = (c.length - 1) * SCREEN_WIDTH;
    min.value = (c.length - 2) * SCREEN_WIDTH;
  }, [managerRef.current]);

  useAnimatedReaction(
    () => {
      return Math.floor(Math.abs(x.value / SCREEN_WIDTH));
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setCurrentIndex)(currentValue);
      }
    }
  );

  useAnimatedReaction(
    () => Math.abs(x.value), // track the absolute scroll position
    (val, prev) => {
      if (val < 50) {
        // start bounce
        if (bounce.value === 0) {
          bounce.value = withRepeat(
            withSequence(
              withTiming(12, {
                duration: 300,
              }),
              // go back down
              withSpring(0, {
                damping: 15,
                stiffness: 400,
                mass: 0.5,
              })
            ),
            -1,
            true
          );
        }
      } else if (val >= 50 && prev < 50) {
        // stop bounce when moving away
        cancelAnimation(bounce);
        bounce.value = 0;
      }
    }
  );

  const swipeLeft = () => {
    const current = managerRef.current;
    if (Math.abs(x.value) === SCREEN_WIDTH * 3) {
      router.push("/results");
      return;
    }
    if (Math.abs(x.value) % SCREEN_WIDTH !== 0) return;
    const val = clamp(
      Math.abs(x.value) + SCREEN_WIDTH,
      0,
      current.length * SCREEN_WIDTH
    );
    x.value = withTiming(-val, { duration: 500 });
  };

  const bgColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      Math.abs(x.value),
      [0, SCREEN_WIDTH, SCREEN_WIDTH * 2, SCREEN_WIDTH * 3],
      ["#c2d6f6", "#ffffff", "#c2d6f6", "#c2d6f6"]
    );
    return { backgroundColor };
  });

  const btnAnimation = useAnimatedStyle(() => {
    const val = clamp(Math.abs(x.value), min.value, max.value) - min.value;
    const width = interpolate(
      val,
      [0, SCREEN_WIDTH],
      [80, 160],
      Extrapolation.CLAMP
    );
    return { width };
  });

  const arrowAnimation = useAnimatedStyle(() => {
    const val = clamp(Math.abs(x.value), min.value, max.value) - min.value;
    const translateX = interpolate(
      val,
      [0, SCREEN_WIDTH],
      [0, 120],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      val,
      [0, SCREEN_WIDTH / 2],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: translateX + bounce.value }],
      opacity,
    };
  });
  const textAnimation = useAnimatedStyle(() => {
    const val = clamp(Math.abs(x.value), min.value, max.value) - min.value;
    const translateX = interpolate(
      val,
      [0, SCREEN_WIDTH],
      [-120, 0],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      val,
      [SCREEN_WIDTH / 2, SCREEN_WIDTH],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateX }], opacity };
  });

  return (
    <GestureHandlerRootView>
      <Animated.View
        style={bgColor}
        className="flex w-full h-screen bg-background absolute"
      >
        <StatusBar style="light" />
        <PageManager ref={managerRef} x={x} currentiIndex={currentiIndex}>
          <Welcome x={x} />
          <TripCost />
          <Students />
          <Options />
        </PageManager>
        <Pagination data={Array.from({ length: 4 })} x={x} />
        <Btn
          style={btnAnimation}
          className="h-[80px] rounded-full absolute bottom-20 self-center overflow-hidden"
          onPress={swipeLeft}
        >
          <View className="flex  flex-row w-[80px] relative items-center justify-center">
            <AnimatedText
              style={textAnimation}
              className="absolute text-xl font-poppins-bold text-white"
            >
              Tovább
            </AnimatedText>
            <Animated.View style={[arrowAnimation]}>
              <ArrowRight color={"white"} />
            </Animated.View>
          </View>
        </Btn>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
