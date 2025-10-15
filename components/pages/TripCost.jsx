import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import List from "../List";



const TripCost = () => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [data, setData] = useState([]);
  const addItem = () => {
    setData([...data, { name: "test" }]);
  };

  return (
    <View className="flex-1 items-center">
      <Animated.View style={{marginTop : SCREEN_HEIGHT/6}} className="flex flex-col items-center justify-center w-4/5">
        <List className="self-center" style={{ maxHeght: 500 }} data={data} setData={setData} />
      </Animated.View>
    </View>
  );
};

export default TripCost;
