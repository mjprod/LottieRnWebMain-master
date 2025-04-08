import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DayCard from "./DayCard";
import SectionTitle from "../../../components/SectionTitle";
import { DailyCardStatus } from "../../../util/constants";
import {
  getCurrentDate,
  getCurrentWeekDates,
} from "../../../util/Helpers";

import AssetPack from "../../../util/AssetsPack";

const DailyCardsContainer = ({ currentWeek, totalWeeks, days = [], onCardPressed }) => {
  const currentWeekDates = getCurrentWeekDates();
  const [dailyCardData, setDailyCardData] = useState([]);

  const generateCardSet = (day, status = DailyCardStatus.inactive) => {
    return {
      id: day,
      cardSet: day === 4 || day === 6 ? 2 : 1,
      cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND,
      status: status,
      extras:
        day === 7
          ? {
            name: "Gift Card",
            number: 1,
            background: AssetPack.backgrounds.DAILY_CARD_EXTRA_BACKGROUND,
          }
          : null,
    };
  };

  useEffect(() => {
    const cardData = [];
    currentWeekDates.forEach((date, index) => {
      let day = index + 1;
      if (days.includes(date) && date !== getCurrentDate()) {
        cardData.push(generateCardSet(day, DailyCardStatus.completed));
      } else if (
        days.includes(date) &&
        date === getCurrentDate()
      ) {
        cardData.push(generateCardSet(day, DailyCardStatus.active));
      } else {
        cardData.push(generateCardSet(day));
      }
    });
    setDailyCardData(cardData);
  }, [days]);

  return (
    <View style={styles.container}>
      <SectionTitle text={`Week ${currentWeek}/${totalWeeks}`} />
      <FlatList
        ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
        columnWrapperStyle={{ gap: 10 }}
        style={{ width: "100%" }}
        data={dailyCardData}
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
              onPress={() => onCardPressed(item)}
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
    width: "100%",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
    gap: 24,
    marginBottom: 16,
  },
  item: {
    flex: 1,
  },
});

export default DailyCardsContainer;
