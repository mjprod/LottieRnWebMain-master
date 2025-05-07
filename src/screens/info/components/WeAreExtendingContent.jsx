import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../../../util/constants";

const WeAreExtendingContent = () => {

  return (<>
    <View style={styles.topContainer}>
      <Text style={styles.topText}>Draw Extended</Text>

      <Text style={styles.text}>
        Play extended! You’ve got {" "}
        <Text style={{ fontFamily: Fonts.InterBold, color: Colors.jokerWhite50 }}>
          2 free entries
        </Text> into this week’s draw.
      </Text>
    </View>
    <View style={styles.roundedTextContainer}>
      <Text style={styles.roundedText}>7 Day Extension</Text>
    </View>
    <View style={{ flexGrow: 1, justifyContent: "center", marginVertical: 32 }} >
      <Image
        style={{ width: 242, height: 242 }}
        source={AssetPack.images.TIME_IS_ON_YOUR_SIDE} />
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#A6A6A6",
    fontFamily: Fonts.InterRegular,
    textAlign: "center",
    lineHeight: "160%",
    fontSize: 16,
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Dimentions.pageMargin,
  },
  topText: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 32,
    color: Colors.jokerWhite50,
    textTransform: "uppercase",
    textAlign: "center",
    marginHorizontal: Dimentions.pageMargin,
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
    marginBottom: 22,
  },
  roundedText: {
    color: "#FFDEA8",
    fontSize: 16,
    fontFamily: Fonts.InterRegular,
  },
});

export default WeAreExtendingContent;
