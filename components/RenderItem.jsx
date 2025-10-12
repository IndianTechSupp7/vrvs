import { View } from "react-native";
import { Text } from "./CustomText";

const RenderItem = ({ item }) => {
  return (
    <View className="m-1 py-4 px-40 bg-secondary-light rounded-xl">
      <Text>RenderItem</Text>
    </View>
  );
};

export default RenderItem;
