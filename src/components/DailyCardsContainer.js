import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DayCard from "./DayCard";
import DailyCardData from "../data/DailyCardData";
import SectionTitle from "./SectionTitle";

const DailyCardsContainer = ({ currentWeek, totalWeeks, daily }) => {
  return (
    <View style={styles.container}>
      <SectionTitle text={`Week ${currentWeek}/${totalWeeks}`} />
      <FlatList
        ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
        columnWrapperStyle={{ gap: 10 }}
        style={{ width: "100%" }}
        data={DailyCardData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <DayCard
              cardSet={item.cardSet}
              day={item.id}
              cardBackground={item.cardBackground}
              status={item.status}
              extras={item.extras}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  item: {
    flex: 1,
  },
});

export default DailyCardsContainer;
