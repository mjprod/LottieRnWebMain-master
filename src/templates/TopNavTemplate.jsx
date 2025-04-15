import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";
import CopyrightText from "../components/CopyrightText";
import { useGame } from "../context/GameContext";
import ProfileHeader from "../components/ProfileHeader";
import { Platform } from "react-native";
import LinearGradient from 'react-native-web-linear-gradient';
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";

const TopNavTemplate = ({ title, subtitle, navBackgroudImage, hasBackButton, children, pillText, showCopyright = true, type, showProfileHeader = true }) => {
    const { user } = useGame()
    const scrollY = useRef(new Animated.Value(0)).current;
    const [bottomChevronStyles, setBottomChevronStyles] = useState(styles.bottomChevronContainer);

    const topNavOpacity = scrollY.interpolate({
        inputRange: [0, 160],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleScroll = (event) => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: Platform.OS !== 'web', }
        )
        if (isCloseToBottom(event.nativeEvent)) {
            setBottomChevronStyles({ ...bottomChevronStyles, display: 'none' })
        } else {
            setBottomChevronStyles({ ...bottomChevronStyles, display: 'flex' });
        }
    };

    return (<>
        <Animated.ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[1]}
            onScroll={handleScroll}
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
                    style={{ marginBottom: -10 }}
                />
            </Animated.View>
            {
                showProfileHeader &&
                <Animated.View style={[{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    backgroundColor: "#0A0A0AE6",
                    paddingHorizontal: 20,
                    boxShadow: `0px 6px 10px 2px rgba(0, 0, 0, 0.6)`,
                }]}>
                    <Animated.View style={{ borderTopWidth: topNavOpacity, borderTopColor: Colors.jokerBlack200 }}>
                        <ProfileHeader id={user.user_id} name={user.name} />
                    </Animated.View>
                </Animated.View>
            }
            <View style={showProfileHeader && { paddingTop: 32 }}>{children}</View>
            {children}
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
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.jokerBlack1100,
    },
    bottomChevronContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 100,
        left: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    lottieAnimation: {
        height: 20,
        width: 20
    }
});

export default TopNavTemplate;
