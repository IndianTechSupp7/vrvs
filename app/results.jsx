import { useEffect, useState } from "react";
import { Animated, ScrollView, useWindowDimensions, View } from "react-native";
import { LinearTransition } from "react-native-reanimated";
import { Text } from "../components/CustomText";
import Tanulo from "../lib/logic";
import { cn } from "../lib/utils";
import { useGlobalProvider } from "../providers/global";
const LayoutTransition = LinearTransition.springify().duration(300);

const Results = () => {
  const { diakok, kiadasok } = useGlobalProvider();
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [tanulok, setTanulok] = useState([]);
  useEffect(() => {
    Tanulo.reset();
    diakok.forEach((e) => {
      new Tanulo(e.budget, 3);
    });

    const sum = kiadasok.map((x) => x.cost).reduce((x, y) => x + y);
    Tanulo.calc(sum, 0);
    console.log(Tanulo.tanulok);

    setTanulok(Tanulo.tanulok);
  }, [diakok, kiadasok]);

  return (
    <View className="flex flex-1 items-center justify-center">
      <ScrollView
        style={{ maxHeight: (SCREEN_HEIGHT / 3) * 2 }}
        className={cn("w-full flex flex-1")}
      >
        {tanulok
          ?.slice() // make a copy so original array isn’t mutated
          .reverse()
          .map((item, index) => (
            <Animated.View
              className="w-full self-center"
              key={diakok[index].id}
              layout={LayoutTransition}
            >
              <View>
                <Text>{item.toString()}</Text>
              </View>
            </Animated.View>
          ))}
        <View className="flex-1 py-40" />
      </ScrollView>
    </View>
  );
};

export default Results;
