import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../util/constants';

const CopyrightText = ({ style }) => {
  return (
    <Text style={[styles.copyright, style]}>
            Copyright ©2025 JokerPlus.{"\n"}All rights reserved.
    </Text>
  );
};

const styles = StyleSheet.create({
  copyright: {
    lineHeight: "150%",
    alignContent: "center",
    textAlign: "center",
    fontSize: 16,
    backgroundColor: Colors.jokerBlack800,
    color: Colors.jokerBlack200,
  },
});
export default CopyrightText;