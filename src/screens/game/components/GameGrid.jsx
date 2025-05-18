
import React, { useMemo } from "react";
import { View, ImageBackground, Animated, StyleSheet } from "react-native";
import AnimatedIcon from "../../../components/AnimatedIcon";
import LottieView from "react-native-web-lottie";

const GameGrid = ({
  backgroundScratchCard,
  iconsArray,
  winningIcons,
  clickedIcons,
  scratched,
  handleIconClick,
  timerGame,
  arrayBobble,
  lottieAnimations,
  iconComponentsDefault,
  fadeAnim,
}) => {
  // Memoized Grid Rendering
  const renderGrid = useMemo(() => {
    return iconsArray.map((icon, index) => {
      if (icon === null) {return null;} // Skip rendering if icon is null

      const isWinningIcon = winningIcons.includes(icon) && !clickedIcons.includes(index) && scratched;
      const isClickedIcon = clickedIcons.includes(index);
      const animationIndex = arrayBobble[index];

      return (
        <View key={index} style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            {isWinningIcon ? (
              <AnimatedIcon
                iconIndex={icon}
                onClick={() => handleIconClick(index)}
                timerGame={timerGame}
                bobble={animationIndex}
              />
            ) : isClickedIcon ? (
              <LottieView
                style={styles.lottieAnimation}
                source={lottieAnimations[animationIndex]}
                autoPlay
                loop={false}
                resizeMode="cover"
              />
            ) : (
              iconComponentsDefault[icon]
            )}
          </View>
        </View>
      );
    });
  }, [iconsArray, winningIcons, clickedIcons, scratched, handleIconClick, timerGame, arrayBobble, lottieAnimations, iconComponentsDefault]);

  return (
    <ImageBackground source={backgroundScratchCard} style={styles.background_view} resizeMode="cover">
      <View style={styles.container}>
        <Animated.View style={[styles.gridContainer, { opacity: fadeAnim }]}>
          {renderGrid}
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    flexBasis: "18%",
    minWidth: "18%",
    aspectRatio: 1,
    marginTop: "1.2%",
    marginLeft: "2%",
    marginRight: "2%",
    boxSizing: "border-box",
  },
  iconWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: "100%",
    height: "100%",
  },
  background_view: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
export default React.memo(GameGrid);