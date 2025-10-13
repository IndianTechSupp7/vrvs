import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import Animated, { LinearTransition } from "react-native-reanimated";
import { v4 as uuidv4 } from "uuid";
import { useGlobalProvider } from "../providers/global";
import RenderItem from "./RenderItem";

const LayoutTransition = LinearTransition.springify().duration(300);

const List = ({ data, setData, style }) => {
  const { verticalGestureRef } = useGlobalProvider();
  const [dt, setDt] = useState(data);

  useEffect(() => {
    const f = dt.filter((x) => x.init)?.length;
    console.log(f);
    if (!f || f === 0) {
      setDt((data) => [...data, { id: uuidv4(), init: true }]);
    }
  }, [data]);
  useEffect(() => {
    setData(dt.filter((x) => !x.init));
  }, [dt]);

  return (
    <ScrollView
      style={{ maxHeight: 600 }}
      ref={verticalGestureRef}
      className="w-full "
    >
      {dt
        .slice() // make a copy so original array isn’t mutated
        .reverse()
        .map((item, index) => (
          <Animated.View key={item.id} layout={LayoutTransition}>
            <RenderItem item={item} setData={setDt} index={index} />
          </Animated.View>
        ))}
    </ScrollView>
  );
};

export default List;
