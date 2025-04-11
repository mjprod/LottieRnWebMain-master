import React from "react";
import { View, StyleSheet, Platform, Pressable, } from "react-native";
import Video from "../../../components/Video";
import BrowserDetection from "react-browser-detection";
import AssetPack from "../../../util/AssetsPack";
import { isAndroidWebView } from "../../../util/Helpers";

const WinLuckySymbolView = ({ videoRef, style, onSkipClicked, onVideoEnd }) => {
    return (
        <View
            key="overlay"
            style={{
                ...styles.blackOverlayWin,
                flex: 1,
                zIndex: 9999,
                elevation: 10,
                alignContent: "flex-end",
            }}
        >
            <BrowserDetection>
                {{
                    chrome: () => (
                        <Video
                            ref={videoRef}
                            source={AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME}
                            style={styles.transparentVideo}
                            onEnd={onVideoEnd}
                            onEnded={onVideoEnd}
                        />
                    ),
                    default: (browser) => (
                        <Video
                            ref={videoRef}
                            source={isAndroidWebView() ? AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME : AssetPack.videos.WIN_LUCKY_SYMBOL}
                            style={styles.transparentVideo}
                            onEnd={onVideoEnd}
                            onEnded={onVideoEnd}
                        />
                    ),
                }}
            </BrowserDetection>
            <Pressable style={styles.clickableArea} onPress={onSkipClicked}>
                <View style={styles.transparentOverlay} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    transparentVideo: {
        width: 300,
        height: 300,
        objectFit: "contain",
        resizeMode: "contain",
    },
    blackOverlayWin: {
        ...Platform.select({
            web: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            },
            default: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            },
        }),
    }, clickableArea: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
    }, transparentOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
});

export default WinLuckySymbolView;
