import React from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-web";
import AssetPack from "../../../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../../../util/constants";
import ResourceTile from "../../../components/ResourceTile";

DrawInProgressContent.propTypes = {
  ticketsEarned: PropTypes.number,
};

function DrawInProgressContent({ ticketsEarned = 0 }) {
  return (
    <>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>Draw in progress</Text>
        <Text style={styles.bottomText}>That’s a wrap! Winner revealed soon and via email.</Text>
        <ResourceTile title="Tickets in draw" icon={AssetPack.icons.GOLDEN_TICKET} number={ticketsEarned} unit="ENTRIES" />
      </View>
      <View style={{ flexGrow: 1, justifyContent: "center", marginVertical: 32 }} >
        <Image
          style={{ width: 242, height: 242 }}
          source={AssetPack.images.DRAW_IN_PROGRESS} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  bottomText: {
    fontFamily: Fonts.InterRegular,
    fontSize: 16,
    color: Colors.jokerBlack50,
    textAlign: "center",
    marginBottom: 32,
    marginHorizontal: Dimentions.pageMargin,
  },
});

export default DrawInProgressContent;
