import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";
import CopyrightText from "../components/CopyrightText";
import { useGame } from "../context/GameContext";
import ProfileHeader from "../components/ProfileHeader";
import BrowserDetection from "react-browser-detection";
import useIsIosWebview from "../hook/useIosWebview";

const TopNavTemplate = ({ title, subtitle, navBackgroudImage, hasBackButton, children, pillText, showCopyright = true, type, showProfileHeader = true }) => {
    const { user } = useGame()
    const scrollY = useRef(new Animated.Value(0)).current;
    const isIosWebview = useIsIosWebview();

    const topNavOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const topPadding = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [52, 0],
        extrapolate: 'clamp'
    });
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [Colors.transparent, Colors.jokerBlack1100],
        extrapolate: 'clamp'
    });

    return (
        <Animated.ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[1]}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode="never">
            <Animated.View style={{ opacity: topNavOpacity }}>
                <TopBannerNav
                    title={title}
                    subtitle={subtitle}
                    backgroundImage={navBackgroudImage}
                    hasBackButton={hasBackButton}
                    pillText={pillText}
                    type={type}
                    style={{ marginBottom: -88 }}
                />
            </Animated.View>
            {
                showProfileHeader &&
                <Animated.View style={{ backgroundColor: headerBackgroundColor, paddingTop: isIosWebview ? 52 : 0, paddingHorizontal: 20, boxShadow: `0px 6px 10px 2px rgba(0, 0, 0, 0.6)`, }}>
                    <Animated.View style={{ borderTopWidth: topNavOpacity, borderTopColor: Colors.jokerBlack200 }}>
                        <ProfileHeader id={user.user_id} name={user.name} />
                    </Animated.View>
                </Animated.View>
            }
            <View style={showProfileHeader ? { paddingTop: 32 } : { paddingTop: isIosWebview ? 52 : 0 }}>{children}</View>
            {showCopyright && <CopyrightText style={{ padding: 20 }} />}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.jokerBlack1100,
    }
});

export default TopNavTemplate;
