import { Plus } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Switch, TextInput, View } from "react-native";
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
  ({ value, setValue, placeholder, onPress, className, ...args }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={String(value ?? "")}
        onChangeText={setValue}
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

// ───────────────────────────────────────────────
// Bővített menü diák hozzáadásához
// ───────────────────────────────────────────────
const ExpandedMenu = ({ onPress, item, setActive }) => {
  const budgetInputRef = useRef(null);
  const [nev, setNev] = useState("");
  const [budget, setBudget] = useState("");
  const [discount, setDiscount] = useState(false);
  const [count, setCount] = useState("1");

  return (
    <Pressable className="flex flex-col flex-1">
      <View className="flex">
        <View className="flex flex-row m-3 gap-2">
          <Entry
            value={nev}
            setValue={setNev}
            className="flex-1"
            placeholder="Diák neve"
            onSubmitEditing={() => {
              budgetInputRef.current?.focus();
            }}
          />
          <View className="flex-1 w-min h-min flex flex-row items-baseline gap-1">
            <Entry
              value={budget}
              setValue={setBudget}
              ref={budgetInputRef}
              className="flex-[2] m-0"
              placeholder="Büdzsé (Ft)"
              keyboardType="numeric"
            />
            <Text className="flex-1 text-sm text-slate-400">ft</Text>
          </View>
        </View>

        <View className="flex flex-row justify-between items-center mx-3 mb-2">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-slate-700 text-base">Kedvezményes</Text>
            <Switch
              value={discount}
              onValueChange={setDiscount}
              thumbColor={discount ? "#22c55e" : "#f4f4f5"}
              trackColor={{ true: "#86efac", false: "#cbd5e1" }}
            />
          </View>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-slate-700 text-base">Személyek</Text>
            <Entry
              value={count}
              setValue={setCount}
              className="w-16 text-center"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <Animated.View
        className="absolute"
        style={{ bottom: 0, right: 0, margin: 5 }}
        entering={FadeInDown.springify().damping(60).stiffness(120)}
        exiting={FadeOutUp.springify().damping(60).stiffness(120)}
      >
        <Btn
          className="p-1"
          onPress={() => {
            if (nev && budget) {
              onPress({
                name: nev,
                budget: Number(budget),
                discount,
                count: Number(count),
              });
            }
          }}
        >
          <Text>{item.init ? "Hozzáadás" : "Frissítés"}</Text>
        </Btn>
      </Animated.View>
    </Pressable>
  );
};

// { name : "Samu", budget : 2000, discount : true, count : 2 }
const InitItem = ({ item, setActive, active, ConstructItem, scrollTo }) => {
  return (
    <Animated.View layout={LinearTransition.springify()} className="flex-1">
      {!active ? (
        <Animated.View className="flex flex-row items-center h-full gap-5 px-5">
          <Text className="text-lg grow text-slate-800">{item.name}</Text>
          <View className="flex flex-row items-baseline gap-2">
            {item.discount && (
              <Text className="text-sm text-green-600 font-semibold">
                Kedvezményes
              </Text>
            )}
            <Text className="text-lg text-slate-800">{item.budget}</Text>
            <Text className="text-sm text-slate-500">Ft</Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Text className="text-sm text-slate-600">{item.count} fő</Text>
          </View>
        </Animated.View>
      ) : (
        <ExpandedMenu
          item={item}
          onPress={(args) => {
            ConstructItem(args);
            setActive(false);
          }}
        />
      )}
    </Animated.View>
  );
};

const RenderItem = ({ setData, item, index }) => {
  const { verticalGestureRef, setActive: setGActive, active: gActive } =
    useGlobalProvider();
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

  const ConstructItem = (dt) => {
    setData((prev) => {
      const updated = prev.map((it) =>
        it.id === item.id ? { ...dt, id: it.id } : it
      );
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
      style={{ height: getActive() ? 150 : 50, minHeight: 50 }}
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
