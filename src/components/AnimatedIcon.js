import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Pressable} from 'react-native';
import LottieView from "react-native-web-lottie";
import {IconTypeAnhkActive} from './../assets/icons/IconTypeAnhkActive';
import {IconTypeAnubisActive} from './../assets/icons/IconTypeAnubisActive';
import {IconTypeFeatherActive} from './../assets/icons/IconTypeFeatherActive';
import {IconTypeHorusActive} from './../assets/icons/IconTypeHorusActive';
import {IconTypePyramidActive} from './../assets/icons/IconTypePyramidActive';
import {IconTypeScarabActive} from './../assets/icons/IconTypeScarabActive';
import {IconTypeSphinxActive} from './../assets/icons/IconTypeSphinxActive';
import {IconTypeTabletActive} from './../assets/icons/IconTypeTabletActive';
import { Button } from 'react-native';

const iconComponentsActive = [
  <IconTypeAnubisActive key="0" />,
  <IconTypeAnhkActive key="1" />,
  <IconTypeFeatherActive key="2" />,
  <IconTypeHorusActive key="3" />,
  <IconTypePyramidActive key="4" />,
  <IconTypeScarabActive key="5" />,
  <IconTypeSphinxActive key="6" />,
  <IconTypeTabletActive key="7" />,
];

const AnimatedIcon = ({
  iconIndex,
  onClick,
}) => {
  const handleIconClick = () => {
    console.log('iconIndex', iconIndex);
    if (onClick) {
      onClick(iconIndex);
    }
  };

  return (
    <View style={styles.iconWrapper}>
      {iconComponentsActive[iconIndex]}
      {<TouchableWithoutFeedback onPress={handleIconClick}>
        <View style={styles.overlay}>
          <LottieView
            style={styles.lottieAnimation}
            source={require('./../assets/lotties/lottieScratchieBubble.json')}
            autoPlay
            loop={true}
          />
        </View>
      </TouchableWithoutFeedback>}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 999,
  },
  overlay: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  lottieAnimation: {
    width: '100',
    height: '100%',
  },
});

export default AnimatedIcon;
