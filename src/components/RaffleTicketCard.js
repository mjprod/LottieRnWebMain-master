import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, Platform } from 'react-native';
import LottieView from "react-native-web-lottie";
import ProgressBar from './ProgressBar';
import DiagonalGradientCard from './DiagonalGradientCard';
import AssetPack from '../util/AssetsPack';

const RaffleTicketCard = ({ score = 0, ticketCount = 0, loading, containerStyle }) => {
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
            useNativeDriver: Platform.OS !== 'web',
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
        <DiagonalGradientCard style={{ ...styles.ticketsSection, ...containerStyle }}>
            <View style={styles.containerTotalTicket}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                    <LottieView style={styles.lottieLuckyResultAnimation}
                        source={AssetPack.lotties.TICKET_ENTRY}
                        autoPlay
                        speed={1}
                        loop={false} />
                    <Text style={styles.ticketTitle}>Total Raffle Tickets Earned</Text>
                </View>

                {loading ? (
                    <LoadingView />
                ) : (
                    <Text style={styles.resultPoints}>{ticketCount}</Text>
                )}
            </View>
            <View style={{
                backgroundColor: "#4B595D",
                height: 1,
                width: "100%",
                marginVertical: 16,
            }} />
            <View style={styles.containerNextTicket}>
                <Text style={styles.nextTicketText}>Next Ticket</Text>
                <Text style={styles.ticketProgress}>
                    {`${parseInt(progress, 10)} / ${nextTicketIn}`}{" "}
                </Text>
            </View>
            <ProgressBar progress={progress / nextTicketIn} color="#FFD89D" trackColor="#131313" style={styles.progressBar} />
            <View style={styles.sliderContainer}>

            </View>
        </DiagonalGradientCard>
    );
};

const styles = StyleSheet.create({
    ticketsSection: {
        marginTop: 24,
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    ticketTitle: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "#fff",
    },
    nextTicketText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 12,
        color: "#fff",
    },
    ticketProgress: {
        fontFamily: "Inter-SemiBold",
        fontSize: 12,
        color: "#fff",
    },
    containerTotalTicket: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    containerNextTicket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    lottieLuckyResultAnimation: {
        width: 25,
        height: 25,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 8,
    },
    progressBar: {
        width: "100%",
        justifyContent: "center",
        marginTop: 7,
        paddingHorizontal: 0,
    },
    resultPoints: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#00ff00",
    },
});
export default RaffleTicketCard;
