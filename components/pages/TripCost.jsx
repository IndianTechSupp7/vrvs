import { useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useGlobalProvider } from "../../providers/global";
import { Text } from "../CustomText";
import List from "../List";
import RenderItem from "../RenderItem";

const TripCost = () => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { kiadasok, setKiadasok } = useGlobalProvider();
  const addItem = () => {
    setData([...data, { name: "test" }]);
  };

  const dFilter = (prev) => {
    let data = prev.filter((x) => (x.cost && x.name) || x.init);
    return data;
  };

  return (
    <View className="flex-1 items-center">
      <Animated.View
        style={{ marginTop: SCREEN_HEIGHT / 6 }}
        className="flex flex-col items-center justify-center w-4/5"
      >
        <Text className="text-3xl text-center font-poppins-semibold py-10 text-[#98bbf4]">
          Irja be a kirándulás költségeit!
        </Text>

        <List
          className="self-center"
          dFilter={dFilter}
          RenderItem={({ item, index, setData }) => (
            <RenderItem item={item} setData={setData} index={index} />
          )}
          style={{ maxHeght: 500 }}
          data={kiadasok}
          setData={setKiadasok}
        />
      </Animated.View>
    </View>
  );
};

export default TripCost;
