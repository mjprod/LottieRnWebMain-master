import React, { useRef, useState , useEffect} from "react";
import { View, StyleSheet, ImageBackground, Animated } from "react-native";
import { VideoBackground } from "../components/VideoBackground";
import TopLayout from "../components/TopLayout";
import ScratchLayout from "../components/ScratchLayout";
import NavLayout from "../components/NavLayout";
import { backgroundLoop } from "../global/Assets";

const backgroundGame = require("./../assets/image/background_game.png");

const ScratchLuckyGame = () => {
  const [reset, setReset] = useState(false);
  const [scratched, setScratched] = useState(false);

  const [scratchStarted, setScratchStarted] = useState(false);
  const [luckySymbolCount, setLuckySymbolCount] = useState(0);

  const marginTopAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (scratchStarted) {
      Animated.timing(marginTopAnim, {
        toValue: 10, // Target value for marginTop
        duration: 500, // Duration of the animation (500ms)
        useNativeDriver: false, // Cannot use native driver for layout properties
      }).start();
    } else {
      Animated.timing(marginTopAnim, {
        toValue: 0, // Reset marginTop to 0
        duration: 500, // Duration of the animation (500ms)
        useNativeDriver: false,
      }).start();
    }
  }, [scratchStarted]);

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
              />
            </View>
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
});

export default ScratchLuckyGame;
