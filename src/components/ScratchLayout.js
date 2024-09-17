import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ScratchCardLeft from "./ScratchCardLeft";
import ScratchGame from "./ScratchGame";
import ScratchCard from "./ScratchCard";
import {
  eraserShouldBeScratched,
  heightScratch,
  setLuckySymbolCountTimer,
} from "../global/Settings";
import { Dimensions } from "react-native-web";

const scratchForeground = require("./../assets/image/scratch_foreground.jpg");

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ScratchLayout = ({
  reset,
  setReset,
  scratched,
  setScratched,
  luckySymbolCount,
  setLuckySymbolCount,
  setScratchStarted,
  scratchCardLeft,
  setScratchCardLeft,
  timerGame,
  score,
  setScore,
  setWinLuckySymbolVideo,
  setCollectLuckySymbolVideo,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLuckySymbolTrue, setIsLuckySymbolTrue] = useState(false);
  const [triggerAutoPop, setTriggerAutoPop] = useState(false);
  const [isScratchCardVisible, setIsScratchCardVisible] = useState(true);
  const [autoScratch, setAutoScratch] = useState(false);
 // const [collectLuckySymbol, setCollectShowLuckySymbol] = useState(false);
 // const [showLuckySymbol, setShowLuckySymbol] = useState(true);
  //const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);
  const [scratchedStarted, setScratchedStarted] = useState(false);

  const setScratchedCard = () => {
    if (isLuckySymbolTrue) {
      if (luckySymbolCount === 2) {
       // setCollectShowLuckySymbol(true);
      } else {
        //setShowLuckySymbol(true);
        //playSong(audioLuckySymbolCoins);
      }

      setTimeout(() => {
        //if (skipToFinishLuckyVideo) {
        //addLuckySymbol();
        //}
      }, setLuckySymbolCountTimer);

      setIsLuckySymbolTrue(false);
      setTimeout(() => {
        //if (skipToFinishLuckyVideo) {
        //setShowLuckySymbol(false);
        setScratched(true);
        setIsScratchCardVisible(false);
        //}
      }, 5300);
    } else {
      setScratched(true);
      setIsScratchCardVisible(false);
      if (isWinner) {
        //setButtonText("AUTO POP");
      } else {
        //endGame();
      }
    }
  };

  const handleScratch = (scratchPercentage) => {
    if (scratchPercentage >= eraserShouldBeScratched && isScratchCardVisible) {
      setScratchedCard();
    } else {
      if (scratchPercentage > 0) {
        setScratchedStarted(true);
      }
    }
  };

  useEffect(() => {
    if (reset) {
      setIsScratchCardVisible(true);
      setTriggerAutoPop(false);
      setIsWinner(false);
      setScratchedStarted(false);
      setScratched(false);
      setAutoScratch(false);
      setReset(false);
    }
  }, [reset, setReset, setScratched]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomView}>
        <ScratchGame
          score={score}
          setScore={setScore}
          isWinner={isWinner}
          setIsWinner={setIsWinner}
          onAutoPop={triggerAutoPop}
          //onEndGame={endGame}
          scratched={scratched}
          reset={reset}
          setReset={setReset}
          //onLoading={imageLoading}
          //isLuckySymbolTrue={isLuckySymbolTrue}
          setIsLuckySymbolTrue={setIsLuckySymbolTrue}
          timerGame={timerGame}
          setWinLuckySymbolVideo={setWinLuckySymbolVideo}
          luckySymbolCount={luckySymbolCount}
          setLuckySymbolCount={setLuckySymbolCount}
          setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
        />
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
          </View>
        )}

        <Image style={styles.arrowImage} source={null} />
      </View>

      <View
        //ref={buttonRef}
        //onLayout={handleLayout}
        style={{ marginTop: 5, overflow: "hidden", alignSelf: "stretch" }}
      >
        <ScratchCardLeft scratchCardsLeft={scratchCardLeft} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: "-10%",
    //overflow: "hidden",
  },
  bottomView: {
    width: "100%",
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
  },
  transparentVideo: {
    position  : "absolute",
    top: 0,
    left: 0,
    //height: windowHeight,
    //width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
   
  },
  transparentOverlay: {
    position  : "absolute",
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
  },
});

export default ScratchLayout;
