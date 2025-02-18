import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DayCard from './DayCard';
import DailyCardData from '../data/DailyCardData';

const DailyCardsContainer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.weekText}>{"Week 1/3"}</Text>
            <FlatList
                style={{ width: "100%" }}
                data={DailyCardData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <DayCard cardSet={item.cardSet} day={item.id} cardBackground={item.cardBackground} isActive={item.isActive} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: 'column',
        alignItems: 'start',
    },
    item: {
        flex: 1,
        padding: 8,
    },
    weekText: {
        fontFamily: "Teko-Medium",
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 16,
        marginTop: 16,
        textTransform: "uppercase",
    },
});

export default DailyCardsContainer;