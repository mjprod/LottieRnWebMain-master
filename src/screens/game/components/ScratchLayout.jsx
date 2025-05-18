import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import ScratchCardLeft from "./ScratchCardLeft";
import ScratchGame from "./ScratchGame";
import ScratchCard from "./ScratchCard";
import { eraserShouldBeScratched, heightScratch, widthScratch } from "../../../global/Settings";

ScratchLayout.propTypes = {
  reset: PropTypes.bool.isRequired,
  scratched: PropTypes.bool.isRequired,
  setScratched: PropTypes.func.isRequired,
  scratchStarted: PropTypes.bool.isRequired,
  setScratchStarted: PropTypes.func.isRequired,
  scratchCardLeft: PropTypes.number.isRequired,
  timerGame: PropTypes.number.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  setWinLuckySymbolVideo: PropTypes.func.isRequired,
  setCollectLuckySymbolVideo: PropTypes.func.isRequired,
  clickCount: PropTypes.number.isRequired,
  setClickCount: PropTypes.func.isRequired,
  nextCard: PropTypes.func.isRequired,
  setComboPlayed: PropTypes.func.isRequired,
  maxCombinations: PropTypes.number.isRequired,
  hasLuckySymbol: PropTypes.bool.isRequired,
};

function ScratchLayout({
  reset,
  scratched,
  setScratched,
  scratchStarted,
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
}) {
  const handleScratch = (scratchPercentage) => {
    if (scratchPercentage >= eraserShouldBeScratched && !scratched) {
      setScratched(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <ScratchGame
          maxCombinations={maxCombinations}
          hasLuckySymbol={hasLuckySymbol}
          scratched={scratched}
          reset={reset}
          nextCard={nextCard}
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
      </View>
      <View style={{ marginTop: 5, marginBottom: 10, overflow: "hidden", alignSelf: "stretch" }}>
        <ScratchCardLeft scratchCardLeft={scratchCardLeft} scratchStarted={scratchStarted} />
      </View>
    </View>
  );
}
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
});

export default React.memo(ScratchLayout);
