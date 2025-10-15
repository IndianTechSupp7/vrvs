import { Plus } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import "react-native-get-random-values";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "../lib/utils";
import { useGlobalProvider } from "../providers/global";
import Btn from "./btn";
import { Text } from "./CustomText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LayoutTransition = LinearTransition.springify().duration(300);

const Entry = React.forwardRef(
  ({ placeholder, onPress, className, ...args }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn("bg-slate-200 rounded-md px-3 py-2", className)}
        onPress={onPress}
        placeholderTextColor={"#94a3b8"}
        placeholder={placeholder}
        {...args}
      />
    );
  }
);

const COLORS = {
  red: {
    text: "text-red-700",
    bg: "bg-red-300",
  },
  blue: {
    text: "text-blue-700",
    bg: "bg-blue-300",
  },
  green: {
    text: "text-green-700",
    bg: "bg-green-300",
  },
  yellow: {
    text: "text-yellow-700",
    bg: "bg-yellow-300",
  },
};

const Tag = ({ color, children: text, active }) => {
  const borderRadius = useSharedValue(0);
  useEffect(() => {
    if (active) borderRadius.value = withTiming(8, { duration: 300 });
    else borderRadius.value = withTiming(20, { duration: 300 });
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => {
    return { borderRadius: borderRadius.value };
  });

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn("h-2 w-2 overflow-hidden", COLORS[color].bg)}
    >
      {active && (
        <Text
          className={cn(
            "text-md px-2 py-1 flex justify-center items-center",
            COLORS[color].text
          )}
        >
          {text}
        </Text>
      )}
    </AnimatedPressable>
  );
};

const ExpandedMenu = ({ onPress, item, setActive }) => {
  const costInputRef = useRef(null);
  return (
    <Pressable className="flex flex-col flex-1">
      <View className="flex">
        <View className="flex flex-row m-3 gap-2">
          <Entry
            className="flex-1"
            placeholder="kiadás neve"
            onSubmitEditing={() => {
              costInputRef.current?.focus();
            }}
          />
          <View className="flex-1 w-min h-min flex flex-row items-baseline gap-1">
            <Entry
              ref={costInputRef}
              className="flex-[2] m-0"
              placeholder="kiadás ára"
              keyboardType="numeric"
            />
            <Text className="flex-1 text-sm text-slate-400">ft/fő</Text>
          </View>
        </View>
        <View className="flex flex-row m-1 flex-1 bg-slate-500">
          <Tag color={"red"} active={false}>
            Kötelező
          </Tag>
        </View>
      </View>
      <Animated.View
        className="absolute"
        style={{ bottom: 0, right: 0, margin: 5 }}
        entering={FadeInDown.springify().damping(60).stiffness(120)}
        exiting={FadeOutUp.springify().damping(60).stiffness(120)}
      >
        <Btn className="p-1" onPress={onPress}>
          <Text>{item.init ? "Add" : "Frissítés"}</Text>
        </Btn>
      </Animated.View>
    </Pressable>
  );
};
// { name : "Szállás", cost : 2000 }
const InitItem = ({ item, setActive, active, ConstructItem, scrollTo }) => {
  return (
    <Animated.View layout={LinearTransition.springify()} className="flex-1">
      {!active ? (
        <Animated.View className="flex flex-row items-center h-full gap-5 px-5">
          <Text className="text-lg grow text-slate-800">{item.name}</Text>
          <View className="flex flex-row items-baseline">
            <Text className="text-lg text-slate-800">{item.cost}</Text>
            <Text className="text-sm text-slate-500">ft/fő</Text>
          </View>
          <View className="w-5 h-5 bg-slate-400 rounded-full"></View>
        </Animated.View>
      ) : (
        <ExpandedMenu
          item={item}
          onPress={() => {
            ConstructItem({ name: "test", cost: 2000 });
            setActive(false);
          }}
        />
      )}
    </Animated.View>
  );
};

const RenderItem = ({ setData, item, index }) => {
  const {
    verticalGestureRef,
    setActive: setGActive,
    active: gActive,
  } = useGlobalProvider();
  const itemRef = useRef(null);

  const [isInit, setIsInit] = useState(item.init);

  useEffect(() => {
    if (gActive === itemRef) {
      scrollTo();
      setActive(true);
    } else setActive(false);
  }, [gActive]);

  useEffect(() => {
    if (!isInit) setGActive(itemRef);
  }, [isInit]);

  const scrollTo = () => {
    itemRef.current?.measureLayout(
      verticalGestureRef.current,
      (x, y) => {
        verticalGestureRef.current?.scrollTo({ y, animated: true });
      },
      (error) => console.error("measureLayout error", error)
    );
  };

  //.current?.scrollToEnd({ animated: true });

  const ConstructItem = (dt) => {
    setData((prev) => {
      const updated = prev.map((it) =>
        it.id === item.id ? { ...dt, id: it.id } : it
      );
      //if (item.init) return [...updated, { id: uuidv4(), init: true }];
      return updated;
    });
  };
  const setActive = (t = true) => {
    if (t) {
      if (gActive != itemRef) setGActive(itemRef);
    } else {
      if (gActive === itemRef) setGActive(null);
    }
  };
  const getActive = () => {
    if (itemRef) return gActive === itemRef;
  };

  return (
    <AnimatedPressable
      ref={itemRef}
      style={{ height: getActive() ? 100 : 50, minHeight: 50 }}
      layout={LayoutTransition}
      entering={FadeInUp.delay(300).duration(500).springify()}
      className="my-1 overflow-hidden relative flex-row justify-between w-full bg-slate-300 rounded-xl"
      onPress={() => {
        setActive(!getActive());
        setIsInit(false);
      }}
    >
      {isInit ? (
        <Animated.View
          className="w-full h-full flex justify-center items-center"
          exiting={FadeOut}
          entering={FadeIn}
        >
          <Plus />
        </Animated.View>
      ) : (
        <InitItem
          scrollTo={scrollTo}
          setActive={setActive}
          active={getActive()}
          ConstructItem={ConstructItem}
          item={item}
        />
      )}
    </AnimatedPressable>
  );
};

export default RenderItem;
