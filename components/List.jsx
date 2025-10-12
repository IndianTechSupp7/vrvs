import { FlatList } from "react-native";
import RenderItem from "./RenderItem";

const List = ({ data, setData }) => {
  return (
    <FlatList
      data={data}
      renderItem={(item) => {
        return <RenderItem item={item} />;
      }}
    ></FlatList>
  );
};

export default List;
