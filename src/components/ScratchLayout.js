import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ScratchCardLeft from "./ScratchCardLeft";
import ScratchGame from "./ScratchGame";
import ScratchCard from "./ScratchCard";
import { eraserShouldBeScratched, heightScratch, widthScratch } from "../global/Settings";
import { useGame } from "../context/GameContext";

const scratchForeground = require("./../assets/image/scratch_foreground.jpg");

const ScratchLayout = ({
  reset,
  setReset,
  scratched,
  setScratched,
  setScratchStarted,
  scratchCardLeft,
  timerGame,
  setWinLuckySymbolVideo,
  setCollectLuckySymbolVideo,
  clickCount,
  setClickCount,
  nextCard,
  setLuckySymbolWon,
  setTotalComboCount,
  setComboPlayed,
  maxCombinations,
  hasLuckySymbol
}) => {
  const { luckySymbolCount } = useGame();

  const [imageLoading, setImageLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLuckySymbolTrue, setIsLuckySymbolTrue] = useState(false);
  const [triggerAutoPop, setTriggerAutoPop] = useState(false);
  const [isScratchCardVisible, setIsScratchCardVisible] = useState(true);
  const [autoScratch, setAutoScratch] = useState(false);

  const setScratchedCard = () => {
    if (isLuckySymbolTrue) {
      setIsLuckySymbolTrue(false);
      setScratched(true);
      setIsScratchCardVisible(false);
    } else {
      setScratched(true);
      setIsScratchCardVisible(false);
    }
  };

  const handleScratch = (scratchPercentage) => {
    if (scratchPercentage >= eraserShouldBeScratched && isScratchCardVisible) {
      setScratchedCard();
    } 
  };

  useEffect(() => {
    if (reset) {
      setIsScratchCardVisible(true);
      setTriggerAutoPop(false);
      setIsWinner(false);
      setScratched(false);
      setAutoScratch(false);
      setReset(false);
    }
  }, [reset, setReset, setScratched]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <ScratchGame
          maxCombinations={maxCombinations}
          hasLuckySymbol={hasLuckySymbol}
          isWinner={isWinner}
          setIsWinner={setIsWinner}
          onAutoPop={triggerAutoPop}
          scratched={scratched}
          reset={reset}
          nextCard={nextCard}
          setIsLuckySymbolTrue={setIsLuckySymbolTrue}
          timerGame={timerGame}
          setWinLuckySymbolVideo={setWinLuckySymbolVideo}
          luckySymbolCount={luckySymbolCount}
          setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
          clickCount={clickCount}
          setClickCount={setClickCount}
          setLuckySymbolWon={setLuckySymbolWon}
          setTotalComboCount={setTotalComboCount}
          setComboPlayed={setComboPlayed} />
        {isScratchCardVisible && (
          <View style={styles.scratchCardContainer}>
            <ScratchCard
              setReset={setReset}
              imageSource={scratchForeground}
              autoScratch={autoScratch}
              onScratch={handleScratch}
              onLoading={setImageLoading}
              setScratchStarted={setScratchStarted}
            />
          </View>)}
        <Image style={styles.arrowImage} source={null} />
      </View>
      <View style={{ marginTop: 5, marginBottom: 10, overflow: "hidden", alignSelf: "stretch" }}>
        <ScratchCardLeft scratchCardLeft={scratchCardLeft} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: "-10%",
  },
  bottomView: {
    width: widthScratch,
    height: heightScratch,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  scratchCardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrowImage: {
    position: "absolute",
    marginTop: 10,
    top: -10,
    zIndex: 1,
  }
});

export default ScratchLayout;
