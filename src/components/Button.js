import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../utils/constants";

export default function Button({
  style,
  titleStyle,
  isLoading = false,
  disabled,
  title = "",
  ...props
}) {
    const shouldDisable = !!isLoading || !!disabled;
  return (
    <TouchableOpacity
      activeOpacity={shouldDisable ? 0.6 : 0.8}
      style={[styles.container, shouldDisable && styles.disabledState, style]}
      {...props}
      disabled={shouldDisable}
    >
      {!!isLoading ? (
        <ActivityIndicator size="small" color={COLORS.black} />
      ) : (
        <CustomText bold style={[styles.title, titleStyle]}>{title}</CustomText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 196, 0)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  disabledState: {
      opacity: 0.6
  }
});
