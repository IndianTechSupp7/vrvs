import { Text as RNText } from "react-native";
import { cn } from "../lib/utils";

export const Text = ({ style, className, ...props }) => {
  return (
    <RNText
      {...props}
      className={cn(`font-poppins`, className)} // default font
    />
  );
};
