import { useState } from "react";
import { View } from "react-native";
import List from "../List";

const TripCost = () => {
  const [data, setData] = useState(Array(10));
  return (
    <View className="flex-1 items-center">
      <View className="mt-40 flex flex-col items-center w-full ">
        <List data={data}></List>
      </View>
    </View>
  );
};

export default TripCost;
