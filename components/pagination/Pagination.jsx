import { View } from "react-native";
import Dot from "./Dot";

const Pagination = ({ data, x }) => {
  return (
    <View className="z-50 flex flex-row absolute top-32 self-center">
      {data.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })}
    </View>
  );
};
export default Pagination;
