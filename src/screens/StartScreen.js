import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View, Image } from "react-native";
import { ImageBackground } from "react-native-web";
import { useNavigate } from "react-router";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import LottieTicketSlot from "../components/LottieTicketSlot";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import { useSound } from "../hook/useSoundPlayer";
import TimerComponent from "../components/TimerComponent";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import StatCard from "../components/StatCard";
import AssetPack from "../util/AssetsPack";
import LinkButton from "../components/LinkButton";
import DiagonalGradientCard from "../components/DiagonalGradientCard";

const GameOverScreen = () => {
    const navigate = useNavigate();

    const { switchTrack } = useSound();

    const backgroundResult = require("./../assets/image/background_game.png");
    const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");
    const backgroundTotalTicket = require("./../assets/image/background_total_ticket.png");

    const [progress, setProgress] = useState(12456);
    const [timeLeft] = useTimeLeftForNextDraw();

    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 3000,
            useNativeDriver: false,
        }).start();

        switchTrack(1);
    }, []);

    animatedProgress.addListener(({ value }) => {
        setProgress(value);
    });

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={backgroundResult}
                style={styles.imageBackground}
            >
                <View style={styles.rotatingBackgroundContainer}>
                    <RotatingCirclesBackground />
                </View>

                <View style={styles.container}>
                    <View style={styles.margim}>
                        <View style={styles.header}>
                            <View style={styles.iconWrapper}>
                                <Image
                                    style={{ width: 175, height: 46, marginBottom: 20 }}
                                    source={AssetPack.logos.TURBO_SCRATCH}
                                />
                            </View>
                            <Text style={styles.title}>Welcome</Text>
                            <Text style={styles.userNameText}>Glauco Pereira</Text>
                        </View>
                        <Text style={styles.statsTitle}>total game stats</Text>
                        <View style={styles.resultRow}>
                            <StatCard title="Total Points" stat="+9999" />
                            <View style={{ width: 10 }} />
                            <StatCard title="LUCKY SYMBOLS">
                                <ImageBackground
                                    resizeMode="contain"
                                    source={backgroundLuckySymbol}
                                    style={styles.imageBackgroundLuckySymbol}
                                >
                                    <LottieLuckySymbolCoinSlot topLayout={false} />
                                </ImageBackground>
                                <View style={styles.luckySymbols}></View>
                            </StatCard>
                        </View>

                        {/* Total Tickets Earned Section */}
                        <DiagonalGradientCard style={styles.ticketsSection}>
                            <ImageBackground
                                resizeMode="contain"
                                source={backgroundTotalTicket}
                                style={styles.imageBackgroundLuckySymbol}
                            >
                                <LottieTicketSlot />
                            </ImageBackground>
                            <Text style={styles.ticketTitle}>TOTAL TICKETS EARNED</Text>
                            <View
                                style={{
                                    backgroundColor: "#4B595D",
                                    height: 1,
                                    width: "100%",
                                    marginVertical: 10,
                                }}
                            />
                            <View style={styles.containerTotalTicket}>
                                <Text style={styles.nextTicketText}>Next Ticket</Text>
                                <Text style={styles.ticketProgress}>12456 / 20000</Text>
                            </View>

                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={20000}
                                    value={progress}
                                    onValueChange={(value) => setProgress(value)}
                                    minimumTrackTintColor="#FFD89D" // Custom color for the filled track
                                    maximumTrackTintColor="#000000" // Custom color for the unfilled track
                                    thumbTintColor="#FFD89D" // Custom color for the thumb
                                    thumbStyle={styles.thumb} // Style for the thumb
                                />
                            </View>

                            <Text style={styles.addedPoints}>+9999</Text>
                        </DiagonalGradientCard>
                        <TimerComponent
                            days={timeLeft.days}
                            hours={timeLeft.hours}
                            minutes={timeLeft.minutes}
                            seconds={timeLeft.seconds}
                        />
                        <GameButton
                            text="Play Now"
                            onPress={() => {
                                const initialScore = 0; // Define the initialScore variable
                                const initialTicketCount = 0; // Define the initialTicketCount variable
                                const initialLuckySymbolCount = 0; // Define the initialLuckySymbolCount variable
                                const initialScratchCardLeft = 0; // Define the initialScratchCardLeft variable

                                navigate("/*", {
                                    state: {
                                        initialScore,
                                        initialTicketCount,
                                        initialLuckySymbolCount,
                                        initialScratchCardLeft,
                                    },
                                });
                            }}
                        />
                        <LinkButton
                            style={{ marginBottom: 30 }}
                            text={"How To Play Turbo Scratch >"}
                            handlePress={() => navigate("/how_to_play")}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            web: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 1000,
            },
            default: {
                ...StyleSheet.absoluteFillObject,
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 1000,
            },
        }),
    },
    margim: {
        marginTop: 10,
        width: "85%",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "0%",
    },
    imageBackgroundLuckySymbol: {
        width: 100,
        height: 45,
        alignItems: "center",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    headerIcon: {
        width: 50,
        height: 50,
    },
    title: {
        color: "#FFDEA8",
        fontFamily: "Teko-Medium",
        fontSize: 24,
        textTransform: "uppercase",
    },
    userNameText: {
        fontFamily: "Inter-Medium",
        fontSize: 20,
        color: "#fff"
    },
    statsTitle: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#fff",
        textTransform: "uppercase",
        textAlign: "center",
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    resultCard: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #4B595D",
        borderRadius: 12,
        padding: 8,
    },
    resultTitle: {
        fontSize: 18,
        fontFamily: "Teko-Medium",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 3,
    },
    resultPoints: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#00ff00",
    },
    luckySymbols: {
        flexDirection: "row",
    },
    symbolImage: {
        width: 50,
        height: 50,
    },
    ticketsSection: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #4B595D",
        borderRadius: 12,
        padding: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    ticketTitle: {
        fontFamily: "Teko-Medium",
        fontSize: 18,
        color: "#fff",
    },
    nextTicketText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: "#fff",
    },
    ticketProgress: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: "#fff",
    },
    addedPoints: {
        width: "100%",
        fontFamily: "Teko-Medium",
        fontSize: 22,
        color: "#00ff00",
        textAlign: "end",
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textColumnRigth: {
        position: "relative",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    containerTotalTicket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    slider: {
        height: 1,
        maxHeight: 1,
        transform: [{ scaleY: 4, scaleX: 4 }],
        zIndex: 999,
        elevation: 10,
    },
    thumb: {
        width: 0,
        height: 0,
    },
    sliderContainer: {
        width: "100%",
        //height: 20,
        marginVertical: 10,
        borderRadius: 50,
        backgroundColor: "#000000",
        justifyContent: "center",
        paddingHorizontal: 0,
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rotatingBackgroundContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
});

export default GameOverScreen;
