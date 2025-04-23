import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { useGame } from '../../../context/GameContext';
import AssetPack from '../../../util/AssetsPack';
import { Colors, Fonts } from '../../../util/constants';
import TimerComponent from '../../../components/TimerComponent';
import RaffleTicketCard from '../../../components/RaffleTicketCard';

const BottomDrawer = () => {
  const expandedHeight = 380;
  const nonExpednedHeight = 90
  const expandedWidth = 100;
  const nonExpandedWidth = 95;

  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnimation = useState(new Animated.Value(nonExpednedHeight))[0];
  const widthAnimation = useState(new Animated.Value(expandedHeight))[0];
  const bottomAnimation = useState(new Animated.Value(0))[0];
  const { user } = useGame()

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);

    Animated.parallel([
      Animated.timing(heightAnimation, {
        toValue: isExpanded ? nonExpednedHeight : expandedHeight,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(widthAnimation, {
        toValue: isExpanded ? expandedWidth : nonExpandedWidth,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(bottomAnimation, {
        toValue: isExpanded ? 0 : 24,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  };

  return (
    <>
      {isExpanded && <View style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }} />}
      <Animated.View
        style={[
          styles.drawer,
          {
            height: heightAnimation,
            width: widthAnimation.interpolate({
              inputRange: [nonExpandedWidth, expandedWidth],
              outputRange: [`${nonExpandedWidth}%`, `${expandedWidth}%`],
            }),
            bottom: bottomAnimation
          },
          isExpanded && {
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderColor: Colors.jokerBlack200,
            borderWidth: 1,
          }
        ]}
      >
        <TouchableOpacity onPress={toggleDrawer} style={[styles.toggleButton, isExpanded && {
          borderBottomWidth: 1,
          borderBottomColor: Colors.jokerBlack200,
        }]}>
          <View style={styles.arrow}>
            <Image
              source={AssetPack.icons.ARROW_LEFT}
              style={{ width: 10, height: 20, transform: [isExpanded ? { rotate: "270deg" } : { rotate: "90deg" }], }}
              resizeMode="contain" />
          </View>
          <Text style={styles.title}>MY DRAW TICKETS</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <RaffleTicketCard ticketCount={user.ticket_balance} score={user.total_score} containerStyle={{ width: "100%" }} isCard={false} />
            <View style={{ width: "100%", height: 1, backgroundColor: Colors.jokerBlack200, marginVertical: 24 }} />
            <TimerComponent style={{ marginBottom: 24 }} />
          </View>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.jokerBlack800,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopColor: Colors.jokerBlack200,
    borderTopWidth: 1,
  },
  toggleButton: {
    width: "100%",
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    marginTop: 14,
  },
  title: {
    fontFamily: Fonts.TekoMedium,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  expandedContent: {
    flex: 1,
    backgroundColor: Colors.jokerBlack700,
    alignItems: 'center',
    padding: 24,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  }
});

export default BottomDrawer;
