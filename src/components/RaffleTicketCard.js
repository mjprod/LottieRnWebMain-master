import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, Platform } from 'react-native';
import LottieView from "react-native-web-lottie";
import ProgressBar from './ProgressBar';
import DiagonalGradientCard from './DiagonalGradientCard';
import AssetPack from '../util/AssetsPack';
import { Colors, Fonts } from '../util/constants';

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
        <View style={{ ...styles.ticketsSection, ...containerStyle }}>
            <View style={styles.containerTotalTicket}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                    <LottieView style={styles.lottieLuckyResultAnimation}
                        source={AssetPack.lotties.TICKET_ENTRY}
                        autoPlay
                        speed={1}
                        loop={false} />
                    <Text style={styles.ticketTitle}>Tickets Earned</Text>
                </View>

                {loading ? (
                    <LoadingView />
                ) : (
                    <Text style={styles.resultPoints}>{ticketCount}</Text>
                )}
            </View>
            <View style={{
                backgroundColor: "#FFFFFF1A",
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
            <ProgressBar progress={progress / nextTicketIn} color="#FFDEA8" trackColor="#131313" style={styles.progressBar} />
            <View style={styles.sliderContainer}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ticketsSection: {
        padding: 24,
        borderColor: Colors.jokerBlack200,
        backgroundColor: Colors.jokerBlack800,
        borderWidth: 1,
        borderRadius: 8,
    },
    ticketTitle: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerWhite50,
    },
    nextTicketText: {
        fontFamily: Fonts.InterRegular,
        fontSize: 14,
        color: Colors.jokerWhite50,
    },
    ticketProgress: {
        fontFamily: Fonts.InterRegular,
        fontSize: 14,
        color: Colors.jokerWhite50,
    },
    containerTotalTicket: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: -10
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
        marginTop: 8,
        paddingHorizontal: 0,
    },
    resultPoints: {
        fontFamily: Fonts.TekoRegular,
        fontSize: 30,
        color: Colors.jokerGold400,
    },
});
export default RaffleTicketCard;
