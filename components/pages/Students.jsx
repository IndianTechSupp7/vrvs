import { useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { useGlobalProvider } from "../../providers/global";
import List from "../List";
import RenderItem from "../RenderItemStudents";

const Students = () => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { diakok, setDiakok } = useGlobalProvider();

  return (
    <View className="flex-1 items-center">
      <Animated.View
        style={{ marginTop: SCREEN_HEIGHT / 6 }}
        className="flex flex-col items-center justify-center w-4/5"
      >
        <List
          className="self-center"
          RenderItem={({ item, index, setData }) => (
            <RenderItem item={item} setData={setData} index={index} />
          )}
          style={{ maxHeght: 500 }}
          data={diakok}
          setData={setDiakok}
        />
      </Animated.View>
    </View>
  );
};

export default Students;
