import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Animated, View, StyleSheet, Platform } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";
import CopyrightText from "../components/CopyrightText";
import { useGame } from "../context/GameContext";
import ProfileHeader from "../components/ProfileHeader";
import LinearGradient from 'react-native-web-linear-gradient';
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";

TopNavTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  navBackgroudImage: PropTypes.any,
  navBackgroudVideo: PropTypes.any,
  hasBackButton: PropTypes.bool,
  children: PropTypes.node,
  pillText: PropTypes.string,
  showCopyright: PropTypes.bool,
  type: PropTypes.string,
  showProfileHeader: PropTypes.bool,
};

function TopNavTemplate({ title, subtitle, navBackgroudImage, navBackgroudVideo, hasBackButton, children, pillText, showCopyright = true, type, showProfileHeader = true }) {
  const { user } = useGame();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [bottomChevronStyles, setBottomChevronStyles] = useState(styles.bottomChevronContainer);
  const [showDropShadow, setShowDropShadow] = useState(false);
  const scrollViewRef = useRef();

  const topNavOpacity = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const paddingHorizontal = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  const marginHorizontal = scrollY.interpolate({
    inputRange: [0, 160],
    outputRange: [0, 20],
    extrapolate: 'clamp',
  });

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 30;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const isCloseToTop = ({ contentOffset }) => {
    return contentOffset.y <= 0;
  };
  const handleScroll = (event) => {
    setShowDropShadow(!isCloseToTop(event.nativeEvent));
    if (isCloseToBottom(event.nativeEvent)) {
      setBottomChevronStyles({ ...bottomChevronStyles, display: 'none' });
    } else {
      setBottomChevronStyles({ ...bottomChevronStyles, display: 'flex' });
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, flexDirection: "column" }}
        stickyHeaderIndices={[1]}
        onLayout={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.measure(() => {
              scrollViewRef.current.getScrollResponder().scrollResponderScrollTo({ y: 1, animated: false });
            });
          }
        }}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              listener: handleScroll,
              useNativeDriver: Platform.OS !== 'web',
            },
          )
        }
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never">
        <Animated.View style={{ opacity: topNavOpacity }}>
          <TopBannerNav
            title={title}
            subtitle={subtitle}
            backgroundImage={navBackgroudImage}
            backgroundVideo={navBackgroudVideo}
            hasBackButton={hasBackButton}
            pillText={pillText}
            type={type}
            style={{ marginBottom: -60 }}
          />
        </Animated.View>
        {
          showProfileHeader &&
          <Animated.View style={[{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            marginHorizontal: paddingHorizontal,
            paddingHorizontal: marginHorizontal,
            borderTopWidth: topNavOpacity, borderTopColor: Colors.jokerBlack200,
            borderBottomWidth: 1, borderBottomColor: Colors.jokerBlack200,
          }, showDropShadow && { boxShadow: '0px 4px 4px -2px rgba(0, 0, 0, 0.5)' }]}>
            <ProfileHeader id={user.user_id} name={user.name} totalCards={user.card_balance} />
          </Animated.View>
        }
        <View style={showProfileHeader && { paddingTop: 32 }}>{children}</View>
        {showCopyright && <CopyrightText style={{ padding: 20 }} />}
      </Animated.ScrollView>
      <LinearGradient
        locations={[0, 1.0]}
        colors={["#00000000", Colors.jokerBlack1100]}
        style={bottomChevronStyles}>
        <LottieView
          style={styles.lottieAnimation}
          source={AssetPack.lotties.SCROLL_DOWN_CHEVRON}
          autoPlay
          loop={true}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomChevronContainer: {
    alignItems: 'center',
    display: "none",
    justifyContent: 'flex-end',
    paddingBottom: 10,
    bottom: 0,
    height: 50,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  container: {
    backgroundColor: Colors.jokerBlack1100,
    flexGrow: 1,
  },
  lottieAnimation: {
    height: 20,
    pointerEvents: "box-none",
    width: 20,
  },
  wrapper: {
    flex: 1,
  },
});

export default TopNavTemplate;