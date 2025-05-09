import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../util/constants';

export const AvatarSize = {
  big: 56,
  small: 36,
};

const Avatar = ({ name, containerStyle, size = AvatarSize.big }) => {
  const avatarSizeStyles = size === AvatarSize.big ? styles.big : styles.small;
  const avatarTextStyles = size === AvatarSize.big ? styles.textBig : styles.textSmall;
    
  return (
    <View style={[avatarSizeStyles, styles.avatarContainer, containerStyle]}>
      <Text style={[styles.avatarText, avatarTextStyles]}>{name ? name.charAt(0).toUpperCase() : '?'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  big: {
    width: 56,
    height: 56,
    borderColor: Colors.jokerBlack200,
  },
  small: {
    width: 24,
    height: 24,
    borderColor: Colors.jokerGold400,
  },
  textSmall: {
    fontSize: 16,
  },
  textBig: {
    fontSize: 26,
  },
  avatarContainer: {
    borderRadius: "50%",
    backgroundColor: Colors.jokerBlack800,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  avatarText: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerGold400,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    paddingTop: 2,
  },
});

export default Avatar;