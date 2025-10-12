import { TextInput } from "react-native";

const Entry = ({ className }) => {
  return (
    <TextInput
      className={
        "border border-secondary text-text-light bg-secondary-light/40 rounded-2xl p-4 text-base " +
        className
      }
      placeholder="Email"
      placeholderTextColor={"#94A3B8"}
      keyboardType="email-address"
    />
  );
};

export default Entry;
