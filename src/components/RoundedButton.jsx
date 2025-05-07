import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import { Colors, Fonts } from "../util/constants";

const RoundedButton = ({
  title,
  onPress,
  style,
}) => {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.background} onPress={onPress}>
        <Image
          resizeMode="contain"
          style={{ width: 14, height: 14, marginLeft: -10 }}
          source={AssetPack.icons.ARROW_LEFT} />
        <Text style={styles.titleText}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 42,
    backgroundColor: Colors.jokerBlack800,
    borderWidth: 1,
    borderColor: Colors.jokerBlack100,
  },
  titleText: {
    fontFamily: Fonts.InterMedium,
    fontSize: 16,
    color: Colors.jokerWhite50,
  },
});

export default RoundedButton;
