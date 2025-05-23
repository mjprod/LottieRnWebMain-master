import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Pressable,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { Howl } from "howler";
import { useGame } from "../../../context/GameContext";
import { useSound } from "../../../hook/useSoundPlayer";

const colectLuckyCoins = require("./../../../assets/image/lucky_coin.png");
const lottieStars = require("./../../../assets/lotties/lottieStars.json");
const lottieSymbolsAnim = require("./../../../assets/lotties/3LuckySymbolsPart01.json");
const lottieBonusCard = require("./../../../assets/lotties/lottieBonusCard.json");

const tapSoundFile = require("./../../../assets/audio/tap_sound_1.mp3");
const bonusSoundFile = require("./../../../assets/audio/showtour_Reward.mp3");
const initialLottieSoundFile = require("./../../../assets/audio/collect-gold.mp3");

const LuckySymbolCollect = ({ nextCard, setCollectLuckySymbolVideo, onComplete }) => {
  const { setLuckySymbolCount } = useGame();

  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(
    false,
  );
  const [showBonusCard, setShowBonusCard] = useState(false);

  const bounceAnim = useRef(new Animated.Value(1)).current;
  const lottieAnimRef = useRef(null);

  const { isSoundEnabled } = useSound();

  const initialLottieSound = new Howl({ src: [initialLottieSoundFile], volume: isSoundEnabled ? 1 : 0 });
  const bonusSound = new Howl({ src: [bonusSoundFile], volume: isSoundEnabled ? 1 : 0 });
  const tapSound = new Howl({ src: [tapSoundFile], volume: isSoundEnabled ? 1 : 0 });

  const initialLottieAnimRef = useRef(null);
  const bonusCardLottieRef = useRef(null);

  useEffect(() => {
    if (initialLottieAnimRef.current) {
      initialLottieAnimRef.current.play();
      initialLottieSound.play();
    }
  }, []);

  useEffect(() => {
    if (showBonusCard) {
      bonusSound.play();
    }
  }, [showBonusCard]);

  const handlePress = () => {
    if (isAnimating) { return; }

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
      if (lottieAnimRef.current) {
        lottieAnimRef.current.play();
        tapSound.play();
        if (nextClickCount === 3) {
          setClicks(0);
          setShowBonusCard(true);
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
      onComplete();
      setTimeout(() => {
        setLuckySymbolCount(0);
        nextCard();
      }, 300);
    }, 200);
  };

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
        <View>
          <Pressable onPress={handlePress}>
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
          </Pressable>
          <Text style={styles.tapTextFormat}>TAP!</Text>
        </View>
      )}
      {showBonusCard && (
        <LottieView
          ref={bonusCardLottieRef}
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
  tapTextFormat: {
    fontFamily: "Inter-Bold",
    fontSize: 48,
    color: "#D4C0A4",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: -100,
  },
});

export default LuckySymbolCollect;
