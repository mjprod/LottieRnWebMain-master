import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import PurplePill from "./PurplePill";
import LinearGradient from "react-native-web-linear-gradient";
import { DIMEN_PAGE_MARGIN, COLOR_BACKGROUND } from "../util/constants";

const TopBannerNav = ({
  title = "Be in to win Prizes!",
  subtitle = "Scratch for more chances to win!",
  backgroundImage = AssetPack.backgrounds.TOP_NAV_BACKGROUND,
  onBackPress = () => {},
  hasBackButton = false,
}) => {
  return (
    <ImageBackground
      imageStyle={{ resizeMode: "cover" }}
      style={{
        alignItems: "start",
      }}
      source={backgroundImage}
    >
      <LinearGradient
        colors={["#00000000", "#00000000", COLOR_BACKGROUND]}
        style={styles.linearGradient}
      >
        {hasBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <Image
              style={styles.arrowIcon}
              source={AssetPack.icons.ARROW_LEFT}
            />
          </TouchableOpacity>
        )}
        <PurplePill
          text={"Beta Competition"}
          style={styles.betaCompetitionText}
        />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  arrowIcon: { flex: 1, width: 21, height: 21, resizeMode: "contain" },
  betaCompetitionText: {
    marginBottom: 20,
    marginTop: 20,
    letterSpacing: 1,
  },
  title: {
    fontFamily: "Inter-Bold",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 20,
  },
  linearGradient: {
    width: "100%",
    height: "auto",
    paddingHorizontal: DIMEN_PAGE_MARGIN,
    flex: 1,
    alignItems: "start",
    paddingVertical: DIMEN_PAGE_MARGIN,
  },
});

export default TopBannerNav;
