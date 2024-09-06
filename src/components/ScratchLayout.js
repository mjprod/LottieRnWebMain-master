import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import ScratchCardLeft from "./ScratchCardLeft";
import ScratchGame from "./ScratchGame";
import ScratchCard from "./ScratchCard";
import {
  eraserShouldBeScratched,
  heightScratch,
  setLuckySymbolCountTimer,
  simulateScratchTimeOut,
} from "../global/Settings";

const scratchForeground = require("./../assets/image/scratch_foreground.jpg");

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
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isLuckySymbolTrue, setIsLuckySymbolTrue] = useState(false);
  const [triggerAutoPop, setTriggerAutoPop] = useState(false);
  const [isScratchCardVisible, setIsScratchCardVisible] = useState(true);
  const [autoScratch, setAutoScratch] = useState(false);
  const [collectLuckySymbol, setCollectShowLuckySymbol] = useState(false);
  const [showLuckySymbol, setShowLuckySymbol] = useState(false);
  const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);
  const [scratchedStarted, setScratchedStarted] = useState(false);

  const addLuckySymbol = () => {
    if (luckySymbolCount !== 3) {
      setLuckySymbolCount(luckySymbolCount + 1);
    }
  };

  const setScratchedCard = () => {
    if (isLuckySymbolTrue) {
      if (luckySymbolCount === 2) {
        setCollectShowLuckySymbol(true);
      } else {
        setShowLuckySymbol(true);
        //playSong(audioLuckySymbolCoins);
      }

      setTimeout(() => {
        if (!skipToFinishLuckyVideo) {
          addLuckySymbol();
        }
      }, setLuckySymbolCountTimer);

      setIsLuckySymbolTrue(false);
      setTimeout(() => {
        if (!skipToFinishLuckyVideo) {
          setShowLuckySymbol(false);
          if (isWinner) {
            //setButtonText("AUTO POP");
          }

          setScratched(true);
          setIsScratchCardVisible(false);
          if (isWinner) {
            //setButtonText("AUTO POP");
          } else {
            //endGame();
          }
        }
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
    console.log("Scratch percentage: ", scratchPercentage);
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
      {/*showLuckySymbol && (
          <View
            style={{
              ...styles.transparentOverlayLose,
              //height: windowHeight,
              //width: windowWidth,
              zIndex: 9999,
              elevation: 10,
            }}>
            <View style={styles.overlay}>
          
            </View>
          </View>
          )*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: "-10%",
    overflow: "hidden",
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
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    display: "flex",
    //position: "relative",
    height: heightScratch,
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
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textBottomContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    marginVertical: 4,
    marginTop: 10,
  },
  textTopLeft: {
    color: "#FFEAC8",
    marginLeft: 15,
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 22,
  },
  textTopRight: {
    color: "#3E362A",
    marginRight: 15,
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 22,
    marginLeft: 15,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  androidMargin: {
    marginTop: -25,
  },
  iosMargin: {
    marginTop: -30,
  },
  arrowImage: {
    position: "absolute",
    marginTop: 10,
    top: -10,
    zIndex: 1,
  },
  textFooterTop: {
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#F1D3A3",
  },
  textFooterBottom: {
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#A9A9A9",
  },
  lottieAnimation: {
    position: "absolute",
    top: 0,
    left: -3,
    width: "10%",
    height: "10%",
  },
  transparentVideo: {
    position: "absolute",
    top: -70,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  transparentOverlayLose: {
    position: "absolute",
    marginLeft: -10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLose: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    //height: windowHeight,
    //width: windowWidth,
    zIndex: 9999,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clickableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    //height: windowHeight,
    //width: windowWidth,
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});

export default ScratchLayout;
