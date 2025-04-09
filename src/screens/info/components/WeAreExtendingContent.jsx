import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../../../util/constants";

const WeAreExtendingContent = () => {

  return (<>
    <Image
      style={{ width: 175, height: 46, marginBottom: 20 }}
      source={AssetPack.logos.TURBO_SCRATCH} />
    <Text style={styles.text}>
      Playtime extended by 1 week — more chances to win gift cards! You’ve also received <Text style={{ fontFamily: Fonts.InterBold, color: Colors.jokerWhite50 }}>2 FREE ENTRIES</Text> into this
      week’s draw.
    </Text>
    <View style={{ flexGrow: 1, justifyContent: "center", marginVertical: 32 }} >
      <Image
        style={{ width: 242, height: 242 }}
        source={AssetPack.images.TIME_IS_ON_YOUR_SIDE} />
    </View>
    <View style={styles.roundedTextContainer}>
      <Text style={styles.roundedText}>7 Day Extension</Text>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Dimentions.marginL,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  text: {
    color: "#A6A6A6",
    fontFamily: Fonts.InterRegular,
    textAlign: "center",
    lineHeight: "160%",
    fontSize: 16,
  },
  roundedTextContainer: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderColor: "#D6BC9E",
    borderWidth: 1.5,
    paddingHorizontal: 35.5,
    paddingVertical: 15,
    borderRadius: 30,
    boxShadow: "0px 2px 10px #FFDEA84D",
    elevation: 5,
  },
  roundedText: {
    color: "#FFDEA8",
    fontSize: 16,
    fontFamily: Fonts.InterRegular,
  }
});

export default WeAreExtendingContent;
