import React from 'react';
import {View} from 'react-native';
import Svg, {Image} from 'react-native-svg-web';

export const IconTypeLucky = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      width: 100,
    }}>
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <Image
        href={require('./../image/lucky_coin.png')}
        x="15"
        y="15"
        height="70"
        width="70"
      />
    </Svg>
  </View>
);
