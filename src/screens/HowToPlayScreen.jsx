import React from "react";
import AssetPack from "../util/AssetsPack";
import ShowCaseCarousel from "../components/ShowCaseCarousel";
import TopNavTemplate from "../templates/TopNavTemplate";

const HowToPlayScreen = () => {
  const carouselItems = [
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_1,
    },
    {
      description: "Scratch off the symbols to begin your game.",
      image: AssetPack.images.CAROUSEL_ITEM_2,
    },
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_3,
    },
  ];
  
  return (
    <TopNavTemplate title="How to play?"
      subtitle="Learn step-by-step instructions on how to play."
      navBackgroudImage={AssetPack.backgrounds.TOP_NAV_LEARN}
      hasBackButton={true}>
      <ShowCaseCarousel slideList={carouselItems} />
    </TopNavTemplate>
  );
};

export default HowToPlayScreen;
