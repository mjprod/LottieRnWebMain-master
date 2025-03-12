import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import LottieView from "react-native-web-lottie";
import ProgressBar from './ProgressBar';

const RaffleTicketCard = ({ score = 0, ticketCount = 0, loading, style }) => {
    const nextTicketIn = ticketCount * 20000 + 20000
    const [progress, setProgress] = useState(0);

    const animatedProgress = useRef(new Animated.Value(0)).current;

    animatedProgress.addListener(({ value }) => {
        setProgress(value);
    });

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: score,
            duration: 3000,
            useNativeDriver: false,
        }).start();

        setProgress(score);
    }, [score])


    const LoadingView = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        );
    };

    return (
        <View style={styles.ticketsSection}>
            <View style={styles.containerTotalTicket}>
                <LottieView
                    style={styles.lottieLuckyResultAnimation}
                    source={require("../assets/lotties/lottieTicketEntry.json")}
                    autoPlay
                    speed={1}
                    loop={false}
                />
                <Text style={styles.ticketTitle}>TOTAL RAFFLE TICKETS EARNED</Text>
                {loading ? (
                    <LoadingView />
                ) : (
                    <Text style={styles.resultPoints}>{ticketCount}</Text>
                )}
            </View>
            <View
                style={{
                    backgroundColor: "#4B595D",
                    height: 1,
                    width: "100%",
                    marginVertical: 8,
                }}
            />
            <View style={styles.containerTotalTicket}>
                <Text style={styles.nextTicketText}>Next Ticket</Text>
                <Text style={styles.ticketProgress}>
                    {`${parseInt(progress, 10)} / ${nextTicketIn}`}{" "}
                </Text>
            </View>

            <View style={styles.sliderContainer}>
                <ProgressBar progress={progress / nextTicketIn} color="#FFD89D" trackColor="#131313" style={styles.progressBar} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        flex: 1,
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
    containerTotalTicket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    sliderContainer: {
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
        paddingHorizontal: 0,
    },
    lottieLuckyResultAnimation: {
        width: 25,
        height: 25,
        marginTop: 0,
        marginLeft: 0,
    },
});
export default RaffleTicketCard;
