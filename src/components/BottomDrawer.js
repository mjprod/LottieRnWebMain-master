import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import useTimeLeftForNextDraw from '../hook/useTimeLeftForNextDraw';
import { useGame } from '../context/GameContext';

const BottomDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnimation = useState(new Animated.Value(60))[0]; // Initial height for collapsed state
  const widthAnimation = useState(new Animated.Value(100))[0]; // Initial width (percentage)
  const [timeLeft] = useTimeLeftForNextDraw();
  const { user } = useGame()

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);

    Animated.parallel([
      // Animate height for expanding and collapsing
      Animated.timing(heightAnimation, {
        toValue: isExpanded ? 60 : 200, // Adjust to your expanded height
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      // Animate width to 95% when expanded
      Animated.timing(widthAnimation, {
        toValue: isExpanded ? 100 : 92, // 100% when collapsed, 95% when expanded
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
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
            inputRange: [92, 100],
            outputRange: ['92%', '100%'],
          }),
        },
      ]}
    >
      <TouchableOpacity onPress={toggleDrawer} style={styles.toggleButton}>
        <Text style={styles.arrow}>{isExpanded ? "▲" : "▼"}</Text>
        <Text style={styles.title}>MY DRAW TICKETS</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.timerSection}>
            <Text style={styles.timerLabel}>Time till Next Draw</Text>
            <View style={styles.timerValues}>
              <Text style={styles.timerValue}>{timeLeft.days}</Text>
              <Text style={styles.timerUnit}>Days</Text>
              <Text style={styles.timerValue}>{timeLeft.hours}</Text>
              <Text style={styles.timerUnit}>Hrs</Text>
              <Text style={styles.timerValue}>{timeLeft.minutes}</Text>
              <Text style={styles.timerUnit}>Mins</Text>
              <Text style={styles.timerValue}>{timeLeft.seconds}</Text>
              <Text style={styles.timerUnit}>Secs</Text>
            </View>
          </View>
          <View style={styles.pointsSection}>
            <Text style={styles.points}>{(user.ticket_balance * 20000 + 20000) - user.total_score} Points to go</Text>
            <View style={styles.ticketsSection}>

              <Text style={styles.tickets}>{user.ticket_balance} Tickets</Text>
            </View>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#E3CDA9', // Gold color
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timerSection: {
    flex: 1,
  },
  timerLabel: {
    fontSize: 12,
    color: "#BBBBBB",
    marginBottom: 5,
  },
  timerValues: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerValue: {
    fontSize: 20,
    color: "#00FF00",
    marginRight: 5,
  },
  timerUnit: {
    fontSize: 12,
    color: "#888888",
    marginRight: 10,
  },
  pointsSection: {
    flex: 1,
    alignItems: "center",
  },
  points: {
    fontSize: 12,
    color: "#BBBBBB",
    marginBottom: 5,
  },
  ticketsSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  tickets: {
    fontSize: 18,
    color: "#FFD700",
  },
});

export default BottomDrawer;
