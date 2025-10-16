import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import Animated, { LinearTransition } from "react-native-reanimated";
import { v4 as uuidv4 } from "uuid";
import { cn } from "../lib/utils";
import { useGlobalProvider } from "../providers/global";
import RenderItem from "./RenderItemStudents";

const LayoutTransition = LinearTransition.springify().duration(300);

const List = ({ data, setData, style, className }) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { verticalGestureRef } = useGlobalProvider();
  const [dt, setDt] = useState(data);

  useEffect(() => {
    const f = dt.filter((x) => x.init)?.length;
    if (!f || f === 0) {
      setDt((data) => [...data, { id: uuidv4(), init: true }]);
    }
  }, [data]);
  useEffect(() => {
    setData(dt.filter((x) => !x.init));
  }, [dt]);

  return (
    <ScrollView
      style={{ maxHeight: (SCREEN_HEIGHT / 3) * 2 }}
      ref={verticalGestureRef}
      className={cn("w-full ", className)}
    >
      {dt
        .slice() // make a copy so original array isn’t mutated
        .reverse()
        .map((item, index) => (
          <Animated.View key={item.id} layout={LayoutTransition}>
            <RenderItem item={item} setData={setDt} index={index} />
          </Animated.View>
        ))}
      <View className="flex-1 py-40" />
    </ScrollView>
  );
};

export default List;
