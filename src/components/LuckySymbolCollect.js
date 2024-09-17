import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { updateCurrentTheme } from "../global/Assets";

const colectLuckyCoins = require("./../assets/image/lucky_coin.png");
const lottieStars = require("./../assets/lotties/lottieStars.json");
const lottieSymbolsAnim = require("./../assets/lotties/3LuckySymbolsPart01.json");
const lottieBonusCard = require("./../assets/lotties/lottieBonusCard.json");

const LuckySymbolCollect = ({ setReset,setLuckySymbolCount,setCollectLuckySymbolVideo}) => {
  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const [showBonusCard, setShowBonusCard] = useState(false);
  const [collectLuckySymbol, setCollectShowLuckySymbol] = useState(true);

  const bounceAnim = useRef(new Animated.Value(1)).current;
  const lottieAnimRef = useRef(null);

  const initialLottieAnimRef = useRef(null);

  useEffect(() => {
    if (initialLottieAnimRef.current) {
      initialLottieAnimRef.current.play();
    }
  }, []);

  const handlePress = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextClickCount = clicks + 1;
    setClicks(nextClickCount);
    const finalScale = 1 + 0.05 * nextClickCount;

    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: finalScale + 0.1,
        duration: 100,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(bounceAnim, {
        toValue: finalScale,
        duration: 100,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start(() => {
      console.log(lottieAnimRef.current);
      if (lottieAnimRef.current) {
        lottieAnimRef.current.play();
        if (nextClickCount === 2) {
          setClicks(0);
          setShowBonusCard(true);
            //setLuckySymbolCount(3);
          // Additional logic to handle end game or other actions
        } else {
          //triggerVibration('light');
        }
      }
      setTimeout(() => setIsAnimating(false), 100);
    });
  };

  const handleInitialAnimationComplete = () => {
    setInitialAnimationComplete(true);
  };

  const handleBonusCardAnimationComplete = () => {
    setTimeout(() => {
        setCollectLuckySymbolVideo(false);

        setTimeout(() => {
        setLuckySymbolCount(0);
          setReset(true);
    
          setTimeout(() => {
            updateCurrentTheme();
          }, 500);
        }, 1200);
    }, 1000);
  };

  if (!collectLuckySymbol) return null;

  return (
    <View
      key="overlay"
      style={{
        ...styles.blackOverlayWin,
        flex: 1,
        zIndex: 9999,
        elevation: 10,
      }}
    >
      {!initialAnimationComplete && (
        <LottieView
          ref={initialLottieAnimRef}
          style={styles.initialLottieAnimation}
          source={lottieSymbolsAnim}
          autoPlay={true}
          loop={false}
          speed={0.6}
          onAnimationFinish={handleInitialAnimationComplete}
        />
      )}
      {initialAnimationComplete && !showBonusCard && (
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View
            style={[
              styles.animatedContainer,
              { transform: [{ scale: bounceAnim }] },
            ]}
          >
            <View style={styles.overlay}>
              <Animated.Image
                source={colectLuckyCoins}
                style={styles.collectCoin}
              />

              <LottieView
                key={`lottie-${clicks}`}
                ref={lottieAnimRef}
                style={styles.lottieAnimation}
                source={lottieStars}
                autoPlay={false}
                loop={false}
                speed={2}
              />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {showBonusCard && (
        <LottieView
          //ref={initialLottieAnimRef}
          style={styles.bonusLottieAnimation}
          source={lottieBonusCard}
          autoPlay={true}
          loop={false}
          speed={0.6}
          onAnimationFinish={handleBonusCardAnimationComplete}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
  collectCoin: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  initialLottieAnimation: {
    width: 300,
    height: 300,
  },
  bonusLottieAnimation: {
    width: 450,
    height: 450,
  },
  blackOverlayWin: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
});

export default LuckySymbolCollect;
