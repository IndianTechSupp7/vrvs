import { forwardRef, useImperativeHandle } from "react";
import { useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const MIN_VELOCITY = 300

const PageManager = forwardRef(({ children: pages, x, currentiIndex }, ref) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const context = useSharedValue(0);
  // const [currentiIndex, setCurrentIndex] = useState(0);

  // useAnimatedReaction(
  //   () => {
  //     return Math.floor(Math.abs(x.value / SCREEN_WIDTH));
  //   },
  //   (currentValue, previousValue) => {
  //     if (currentValue !== previousValue) {
  //       runOnJS(setCurrentIndex)(currentValue);
  //     }
  //   }
  // );

  const translateXstyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const PanGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = Math.abs(x.value);
    })
    .onUpdate((e) => {
      const clampValue = clamp(
        context.value - e.translationX,
        0,
        SCREEN_WIDTH * (pages.length - 1)
      );
      x.value = -clampValue;
    })
    .onEnd((e) => {
      const isSwipeLeft = e.translationX < 0;
      const isSwipeRight = e.translationX > 0;
      const isBeyondLeftLimit =
        context.value < (pages.length - 1) * SCREEN_WIDTH;
      const isBeyondRightLimit = context.value > 0;

      let targetIndex;

      if (isSwipeLeft && isBeyondLeftLimit) {
        targetIndex =
          e.translationX < -SCREEN_WIDTH / 2 || e.velocityX < -MIN_VELOCITY
            ? currentiIndex + 1
            : currentiIndex;
      } else if (isSwipeRight && isBeyondRightLimit) {
        targetIndex =
          e.translationX > SCREEN_WIDTH / 2 || e.velocityX > MIN_VELOCITY
            ? currentiIndex
            : currentiIndex + 1;
      }

      if (targetIndex !== undefined) {
        x.value = withTiming(-SCREEN_WIDTH * targetIndex, {
          duration: 500,
        });
      }
    });

  useImperativeHandle(ref, () => ({
    x,
    currentiIndex,
    length: pages.length,
  }));

  return (
    <GestureDetector gesture={PanGesture}>
      <View className="flex-1">
        <Animated.View
          className="flex-1 flex justify-between flex-row"
          style={[
            translateXstyle,
            {
              width: pages.length * SCREEN_WIDTH,
              transform: [{ translateX: 0 }],
            },
          ]}
        >
          {pages}
        </Animated.View>
      </View>
    </GestureDetector>
  );
});

export default PageManager;
