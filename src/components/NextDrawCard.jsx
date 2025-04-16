import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TimerComponent from "./TimerComponent";
import AssetPack from "../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../util/constants";
import Video from "./Video";

const NextDrawCard = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Video
        source={AssetPack.videos.TIMER_CARD}
        style={styles.video}
        muted={true} loop={true}
        objectFit='cover' />
      <View style={styles.topSection}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Your {" "}</Text>
          <Text style={styles.headingTextHighlighted}>Fortune</Text>
          <Text style={styles.headingText}>{" "} Awaits</Text>
        </View>
        <Text style={styles.subtitle}>
          Play daily to enter the draw for amazon prizes!
        </Text>
      </View>
      <View style={styles.timerContainer}>
        <TimerComponent showPill={false} onlyTimer={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0000004D",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.jokerBlack200,
    overflow: "hidden"
  },
  topSection: {
    marginTop: 32,
    marginHorizontal: 48,
    marginBottom: 123,
  },
  timerContainer: {
    paddingVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
    borderTopColor: Colors.jokerBlack200,
    borderTopWidth: 1,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headingContainer: {
    marginTop: Dimentions.marginS,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginBottom: 20,
  },
  headingText: {
    color: Colors.jokerWhite50,
    fontSize: 30,
    fontFamily: Fonts.TekoMedium,
    textTransform: 'uppercase',
    lineHeight: 28,
    paddingTop: 4
  },
  headingTextHighlighted: {
    color: Colors.jokerWhite50,
    fontSize: 30,
    fontFamily: Fonts.TekoMedium,
    textTransform: 'uppercase',
    lineHeight: 28,
    color: Colors.jokerGold400,
    borderColor: Colors.jokerGold400,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingTop: 4
  },
  subtitle: {
    color: Colors.jokerBlack50,
    fontSize: 16,
    textAlign: "center",
    fontFamily: Fonts.InterMedium,
    marginBottom: Dimentions.marginM
  }
});

export default NextDrawCard;
