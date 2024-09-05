import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import { VideoBackground } from "../components/VideoBackground";
import TopLayout from "../components/TopLayout";
import ScratchLayout from "../components/ScratchLayout";
import NavLayout from "../components/NavLayout";
import { backgroundLoop } from "../global/Assets";

const backgroundGame = require("./../assets/image/background_game.png");
const { width } = Dimensions.get("window");

const ScratchLuckyGame = () => {
  const [reset, setReset] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [scratchCardLeft, setScratchCardLeft] = useState(10);

  const [scratchStarted, setScratchStarted] = useState(false);
  const [luckySymbolCount, setLuckySymbolCount] = useState(0);

  const marginTopAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (scratchStarted) {
      Animated.timing(marginTopAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(marginTopAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [scratchStarted]);

  useEffect(() => {
    if (reset) {
      setScratchCardLeft(scratchCardLeft - 1);

      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        translateX.setValue(width);
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [reset, setReset]);

  return (
    <View style={styles.fullScreen}>
      <VideoBackground showAlphaView={scratchStarted} source={backgroundLoop} />
      <View style={styles.containerOverlay}>
        <NavLayout showAlphaView={scratchStarted} />

        <ImageBackground
          source={backgroundGame}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          {
            <Animated.View style={[{ transform: [{ translateX }] }]}>
              <View style={styles.overlay}>
                <Animated.View style={{ marginTop: marginTopAnim }}>
                  <TopLayout scratched={scratched} />
                </Animated.View>

                <ScratchLayout
                  reset={reset}
                  setReset={setReset}
                  scratched={scratched}
                  setScratched={setScratched}
                  luckySymbolCount={luckySymbolCount}
                  setLuckySymbolCount={setLuckySymbolCount}
                  setScratchStarted={setScratchStarted}
                  scratchCardLeft={scratchCardLeft}
                  setScratchCardLeft={setScratchCardLeft}
                />
              </View>
            </Animated.View>
          }
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    position: "relative",
  },
  containerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  imageBackground: {
    flex: 1,
    margin: 10,
    position: "absolute",
    top: 130,
    left: 10,
    right: 10,
    bottom: 10,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    marginTop: -6,
    width: "100%",
    height: "100%",
  },
});

export default ScratchLuckyGame;
