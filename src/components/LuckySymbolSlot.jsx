import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "react-native-web-lottie";

const LuckySymbolSlot = ({ showCoin = false }) => {
    return (
        <View style={styles.container}>
            {showCoin && <LottieView
                style={{ margin: -3 }}
                source={require("../assets/lotties/lottie3DCoinSlot.json")}
                autoPlay
                speed={1}
                loop={false}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        boxShadow: '0px 2px 1px #FFFFFF1A, inset 0px 2px 1px #000000',
        backgroundColor: "#1E1E1E",
        alignContent: "center"
    }
});

export default LuckySymbolSlot;
