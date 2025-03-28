import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import useTimeLeftForNextDraw from '../../../hook/useTimeLeftForNextDraw';
import { useGame } from '../../../context/GameContext';
import AssetPack from '../../../util/AssetsPack';
import LinearGradient from 'react-native-web-linear-gradient';
import { Fonts } from '../../../util/constants';

const BottomDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnimation = useState(new Animated.Value(60))[0];
  const widthAnimation = useState(new Animated.Value(100))[0];
  const [timeLeft] = useTimeLeftForNextDraw();
  const { user } = useGame()

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);

    Animated.parallel([
      Animated.timing(heightAnimation, {
        toValue: isExpanded ? 60 : 170,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(widthAnimation, {
        toValue: isExpanded ? 100 : 98,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.drawer,
        {
          height: heightAnimation,
          width: widthAnimation.interpolate({
            inputRange: [98, 100],
            outputRange: ['98%', '100%'],
          }),
        },
      ]}
    >
      <TouchableOpacity onPress={toggleDrawer} style={styles.toggleButton}>
        <View style={styles.arrow}>
          <Image
            source={AssetPack.icons.ARROW_LEFT}
            style={{ width: 10, height: 20, transform: [isExpanded ? { rotate: "270deg" } : { rotate: "90deg" }], }}
            resizeMode="contain" />
        </View>
        <Text style={styles.title}>MY DRAW TICKETS</Text>
      </TouchableOpacity>

      {isExpanded && (
        <LinearGradient style={styles.expandedContent} start={{ x: 0.0, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.24, 0.54, 1.0]}
          colors={['#212121', '#332C26', '#2B2724', '#212121', '#2121214D']}>
          <View style={styles.timerSection}>
            <Text style={styles.timerLabel}>Time till Next Draw</Text>
            <View style={styles.timerValues}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.timerValue}>{timeLeft.days}</Text>
                <Text style={styles.timerUnit}>Days</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.timerValue}>{timeLeft.hours}</Text>
                <Text style={styles.timerUnit}>Hrs</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.timerValue}>{timeLeft.minutes}</Text>
                <Text style={styles.timerUnit}>Mins</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.timerValue}>{timeLeft.seconds}</Text>
                <Text style={styles.timerUnit}>Secs</Text>
              </View>
            </View>
          </View>
          <View style={styles.pointsSection}>
            <Text style={styles.points}><Text style={{ color: '#FFDEA8' }}>{(user.ticket_balance * 20000 + 20000) - user.total_score}</Text> Points to go</Text>
            <View style={styles.ticketsSection}>
              <Text style={{ color: "#A6A6A6", fontSize: 14, fontFamily: Fonts.InterRegular }}><Text style={{ color: '#FFDEA8', fontFamily: Fonts.TekoMedium, fontSize: 30 }} >{user.ticket_balance}</Text> Tickets</Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#3D3D3D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  toggleButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#E3CDA9',
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10, 
  },
  timerSection: {
    flex: 1.5,
    flexWrap: "wrap",
    borderRightColor: "#000000",
    borderRightWidth: 1,
  },
  pointsSection: {
    padding: 20,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    borderLeftColor: "#3D3D3D",
    borderLeftWidth: 1,
  },

  timerLabel: {
    flex: 0,
    fontSize: 12,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#1D1811",
    color: "#FFDEA8",
    borderColor: "#382E23",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  timerValues: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
  },
  timerValue: {
    fontFamily: Fonts.InterBold,
    fontSize: 18,
    color: "#00FF00",
    marginRight: 5,
  },
  timerUnit: {
    fontSize: 14,
    color: "#A6A6A6",
    marginRight: 10,
  },
 
  points: {
    fontSize: 12,
    color: "#BBBBBB",
    marginBottom: 5,
  },
  ticketsSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ticketIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  tickets: {
    fontSize: 14,
    color: "#A6A6A6",
  },
});

export default BottomDrawer;
