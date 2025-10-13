import { Plus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import "react-native-get-random-values";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useGlobalProvider } from "../providers/global";
import Btn from "./btn";
import { Text } from "./CustomText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LayoutTransition = LinearTransition.springify().duration(300);

const ExpandedMenu = ({ onPress, item, setActive }) => {
  return (
    <Pressable className="flex flex-col flex-1">
      <Animated.View
        className="absolute"
        style={{ bottom: 0, right: 0, margin: 5 }}
        entering={FadeInDown.springify().damping(60).stiffness(120)}
        exiting={FadeOutUp.springify().damping(60).stiffness(120)}
      >
        <Btn onPress={onPress}>
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
          <View className="w-5 h-5 bg-green-400 rounded-full"></View>
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
    itemRef.current?.measure((x, y, width, height, pageX, pageY) => {
      verticalGestureRef.current?.scrollTo({ y: -pageY, animated: true });
    });
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
