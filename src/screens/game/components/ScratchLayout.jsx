import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ScratchCardLeft from "./ScratchCardLeft";
import ScratchGame from "./ScratchGame";
import ScratchCard from "./ScratchCard";
import { eraserShouldBeScratched, heightScratch, widthScratch } from "../../../global/Settings";

const ScratchLayout = ({
  reset,
  scratched,
  setScratched,
  setScratchStarted,
  scratchCardLeft,
  timerGame,
  pauseTimer,
  setWinLuckySymbolVideo,
  setCollectLuckySymbolVideo,
  clickCount,
  setClickCount,
  nextCard,
  setComboPlayed,
  maxCombinations,
  hasLuckySymbol,
}) => {
  const [isLuckySymbolTrue, setIsLuckySymbolTrue] = useState(false);

  const setScratchedCard = () => {
    if (isLuckySymbolTrue) {
      setIsLuckySymbolTrue(false);
      setScratched(true);
    } else {
      setScratched(true);
    }
  };

  const handleScratch = (scratchPercentage) => {
    if (scratchPercentage >= eraserShouldBeScratched && !scratched) {
      setScratchedCard();
    }
  };

  useEffect(() => {
    if (reset) {
      setScratched(false);
    }
  }, [reset]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <ScratchGame
          maxCombinations={maxCombinations}
          hasLuckySymbol={hasLuckySymbol}
          scratched={scratched}
          reset={reset}
          nextCard={nextCard}
          setIsLuckySymbolTrue={setIsLuckySymbolTrue}
          timerGame={timerGame}
          pauseTimer={pauseTimer}
          setWinLuckySymbolVideo={setWinLuckySymbolVideo}
          setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
          clickCount={clickCount}
          setClickCount={setClickCount}
          setComboPlayed={setComboPlayed} />
        {!scratched && (
          <View style={styles.scratchCardContainer}>
            <ScratchCard
              onScratch={handleScratch}
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

export default React.memo(ScratchLayout);
