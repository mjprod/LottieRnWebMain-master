import React from "react";
import { View, StyleSheet } from "react-native";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";
import './index.css';
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.app}>
                  <ScratchLuckyGame />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: "#35363A",
        paddingTop: "10%",

    },
    app: {
        width: 400,  
        maxHeight: 650,
        flex: 1,
        backgroundColor: "black",
        borderRadius: 8,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
    },
});
