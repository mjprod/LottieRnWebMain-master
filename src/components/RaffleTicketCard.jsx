import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Animated, Platform } from 'react-native';
import LottieView from "react-native-web-lottie";
import ProgressBar from './ProgressBar';
import AssetPack from '../util/AssetsPack';
import { Colors, Dimentions, Fonts } from '../util/constants';

const RaffleTicketCard = ({ score = 0, ticketCount = 0, containerStyle }) => {
    const nextTicketIn = 20000

    const [progress, setProgress] = useState(0);

    const animatedProgress = useRef(new Animated.Value(0)).current;

    animatedProgress.addListener(({ value }) => {
        setProgress(value);
    });

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: score - ticketCount * 20000,
            duration: 3000,
            useNativeDriver: Platform.OS !== 'web',
        }).start();

        setProgress(score - ticketCount * 20000);
    }, [score])

    return (
        <View style={{ ...styles.ticketsSection, ...containerStyle }}>
            <View style={styles.containerTotalTicket}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
                    <LottieView style={styles.lottieLuckyResultAnimation}
                        source={AssetPack.lotties.TICKET_ENTRY}
                        autoPlay
                        speed={1}
                        loop={false} />
                    <Text style={styles.ticketTitle}>Tickets earned</Text>
                </View>
                <Text style={styles.resultPoints}>{ticketCount}</Text>
            </View>
            <View style={{
                backgroundColor: "#FFFFFF1A",
                height: 1,
                width: "100%",
                marginVertical: Dimentions.marginS,
            }} />
            <View style={styles.containerNextTicket}>
                <Text style={styles.nextTicketText}>Next ticket</Text>
                <Text style={styles.ticketProgress}>
                    <Text style={styles.ticketProgressNumber}>{parseInt(progress, 10)}</Text>
                    <Text style={styles.ticketProgressDivider}>/</Text>
                    <Text style={styles.ticketProgressNext}>{nextTicketIn}</Text>
                </Text>
            </View>
            <ProgressBar progress={progress / nextTicketIn} color="#FFDEA8" trackColor="#131313" style={styles.progressBar} />
            <View style={styles.sliderContainer}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ticketProgressNumber: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerBlack50
    },
    ticketProgressDivider:{
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerWhite50,
        marginHorizontal: 8,
    },
    ticketProgressNext:{
        fontFamily: Fonts.InterSemiBold,
        fontSize: 16,
        color: Colors.jokerWhite50
    },
    ticketsSection: {
        padding: 24,
        borderColor: Colors.jokerBlack200,
        backgroundColor: Colors.jokerBlack800,
        borderWidth: 1,
        borderRadius: 8,
    },
    ticketTitle: {
        fontFamily: Fonts.InterSemiBold,
        fontSize: 16,
        color: Colors.jokerWhite50,
    },
    nextTicketText: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerWhite50,
    },
    ticketProgress: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerBlack50,
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
        marginRight: 4,
    },
    progressBar: {
        width: "100%",
        justifyContent: "center",
        marginTop: Dimentions.marginS,
        paddingHorizontal: 0,
    },
    resultPoints: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 30,
        letterSpacing: "1%",
        marginVertical: -15,
        color: Colors.jokerGold400,
    },
});
export default RaffleTicketCard;
