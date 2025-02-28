import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigate } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import AssetPack from "../util/AssetsPack";

const HowToPlayScreen = () => {
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  };
  const carouselItems = [
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_1,
    },
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_2,
    },
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_3,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <TopBannerNav
        title="How to play?"
        subtitle="Learn step-by-step instructions on how to play."
        backgroundImage={AssetPack.backgrounds.GOLD_RUSH}
        hasBackButton={true}
        onBackPress={handleBackPress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: "100%",
    height: 144,
    resizeMode: "contain",
  },
});

export default HowToPlayScreen;
