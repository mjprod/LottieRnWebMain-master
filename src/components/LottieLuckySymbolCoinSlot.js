import React from 'react';
import LottieView from "react-native-web-lottie";
import { StyleSheet, View } from 'react-native';

const LottieLuckySymbolCoinSlot = ({ luckySymbolCount , topLayout }) => {
  return (
    <View style={styles.lottieContainer}>
      {[...Array(luckySymbolCount)].map((_, i) => (
        <LottieView
          key={i}
          style={topLayout ? styles.lottieLuckyAnimation : styles.lottieLuckyResultAnimation}
          source={require('./../assets/lotties/lottie3DCoinSlot.json')}
          autoPlay
          speed={1}
          loop={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 18,
    bottom: 9,
  },
  lottieLuckyAnimation: {
    width: '45%',
    height: '45%',
    marginHorizontal: -18,
    marginBottom: 4,
    marginLeft: 0,
    
  },
  lottieLuckyResultAnimation: {
    width: '55%',
    height: '150%',
    marginHorizontal: -22,
    marginTop: 26,
    marginLeft: 0,
  },
});

export default LottieLuckySymbolCoinSlot;
