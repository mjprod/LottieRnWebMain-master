import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Dimentions, Fonts, Colors } from "../../../util/constants";
import LottieView from "react-native-web-lottie";
import { useGame } from "../../../context/GameContext";
import LoadingView from "../../../components/LoadingView";

const Congratulations = () => {
  const { user } = useGame();

  if (!user) {
    return <LoadingView />;
  } else {
    return (
      <>
        <Text style={styles.heading}>Congratulations to</Text>
        <Text style={styles.title}>{user && user.name}</Text>
        <Image
          style={styles.image}
          source={AssetPack.images.AMAZON_GOLD_GIFT_CARD}
          resizeMode={"contain"}
        />
        <Text style={styles.message}>
                    Your <Text style={styles.textHighlighted}>Amazon Gift Card </Text>will be sent to your email within three business days.
        </Text>
        <LottieView
          style={{ flex: 1, position: "absolute", right: 0, top: 0, width: "100%", height: "100%" }}
          source={AssetPack.lotties.CONFETTI}
          speed={1}
          loop={true}
          autoPlay={true} />
      </>
    );
  }

};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 32,
    color: Colors.jokerWhite50,
    textTransform: "uppercase",
    textAlign: "center",
    marginHorizontal: Dimentions.pageMargin,
    marginTop: 22,
  },
  title: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 18,
    color: Colors.jokerBlack50,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: Fonts.InterSemiBold,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    height: 242,
    width: 298,
    marginVertical: 20,
  },
  message: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerBlack50,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 48,
  },
  textHighlighted: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerGold400,
    textAlign: "center",
    fontSize: 16,
  },
});

export default Congratulations;
