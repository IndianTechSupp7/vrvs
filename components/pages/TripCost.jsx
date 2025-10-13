import { Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Btn from "../btn";
import { Text } from "../CustomText";
import List from "../List";

const Entry = ({ placeholder }) => {
  return <TextInput />;
};

const ExpandedMenu = ({ onPress }) => {
  return (
    <View className="flex flex-col">
      <Animated.View
        className="absolute"
        style={{ bottom: 0, right: 0, margin: 5 }}
        entering={FadeInDown.springify().damping(60).stiffness(120)}
        exiting={FadeOutUp.springify().damping(60).stiffness(120)}
      >
        <Btn onPress={onPress}>
          <Text>Add</Text>
        </Btn>
      </Animated.View>
    </View>
  );
};

const NewItem = ({ onPress }) => {
  const [expand, setExpand] = useState(false);
  const height = useSharedValue(50);

  useEffect(() => {
    height.value = 50 + expand * 50;
  }, [expand]);

  const handlePress = () => {
    //onPress()
    setExpand(!expand);
  };

  const AnimatedContainer = useAnimatedStyle(() => {
    return { height: height.value };
  });

  return (
    <Animated.View
      style={AnimatedContainer}
      layout={LinearTransition.springify()}
      className="my-1 overflow-hidden relative flex-row justify-between px-3 py-4 w-full bg-secondary-dark rounded-xl"
    >
      {!expand ? (
        <Btn className="w-full bg-transparent h-[50px]" onPress={handlePress}>
          <Animated.View exiting={FadeOut} entering={FadeIn}>
            <Plus />
          </Animated.View>
        </Btn>
      ) : (
        <ExpandedMenu
          onPress={() => {
            onPress();
            handlePress();
          }}
        />
      )}
    </Animated.View>
  );
};

const TripCost = () => {
  const [data, setData] = useState([]);
  const addItem = () => {
    setData([...data, { name: "test" }]);
  };

  return (
    <View className="flex-1 items-center">
      <Animated.View className="mt-40 flex flex-col items-center w-4/5">
        <List style={{maxHeght : 500}} data={data} setData={setData} />
      </Animated.View>
    </View>
  );
};

export default TripCost;
