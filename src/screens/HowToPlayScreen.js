import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import AssetPack from "../util/AssetsPack";
import ShowCaseCarousel from "../components/ShowCaseCarousel";

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
        "Scratch off the symbols to begin your game.",
      image: AssetPack.images.CAROUSEL_ITEM_2,
    },
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_3,
    },
  ];
  return (
    <View  style={{backgroundColor: "red", flex:1, paddingBottom:20,}}>
      <TopBannerNav
        title="How to play?"
        subtitle="Learn step-by-step instructions on how to play."
        backgroundImage={AssetPack.backgrounds.GOLD_RUSH}
        hasBackButton={true}
        onBackPress={handleBackPress}
      />
      <ShowCaseCarousel slideList={carouselItems} />
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default HowToPlayScreen;
