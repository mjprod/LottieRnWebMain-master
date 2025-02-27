import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DayCard from "./DayCard";
import DailyCardData from "../data/DailyCardData";
import SectionTitle from "./SectionTitle";
import { DailyCardStatus, getCurrentDate } from "../util/constants";
import AssetPack from "../util/AssetsPack";

const DailyCardsContainer = ({
  currentWeek,
  totalWeeks,
  currentWeekDaily = [],
}) => {
  console.log("CurrentWeekDaily", currentWeekDaily);
  function getCurrentWeek() {
    let today = new Date();
    let dayOfWeek = today.getDay();

    let monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    // Generate dates from Monday to Sunday
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }

    return weekDates;
  }

  const currentWeekDates = getCurrentWeek();
  const [dailyCardData, setDailyCardData] = useState([]);

  useEffect(() => {
    if (currentWeekDaily !== "") {
      console.log("CurrentWeekDaily:", currentWeekDaily)
      const cardData = [];
      currentWeekDates.forEach((date, index) => {
        let day = index + 1;
        console.log("Date of week:", date)
        console.log("Date currentDate: ", getCurrentDate())
        console.log("Days has date:", currentWeekDaily.days.includes(date))
        if (currentWeekDaily.days.includes(date) && date !== getCurrentDate()) {
          console.log("Days has date and is not current date")
          cardData.push({
            id: day,
            cardSet: day === 4 || day === 6 ? 2 : 1,
            cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND,
            status: DailyCardStatus.completed,
            extras:
              day === 7
                ? {
                    name: "Gift Card",
                    number: 1,
                    background:
                      AssetPack.backgrounds.DAILY_CARD_EXTRA_BACKGROUND,
                  }
                : null,
          });
        } else if (
          currentWeekDaily.days.includes(date) &&
          date === getCurrentDate()
        ) {
          console.log("Days has date and is current date")
          cardData.push({
            id: day,
            cardSet: day === 4 || day === 6 ? 2 : 1,
            cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND,
            status: DailyCardStatus.active,
            extras:
              day === 7
                ? {
                    name: "Gift Card",
                    number: 1,
                    background:
                      AssetPack.backgrounds.DAILY_CARD_EXTRA_BACKGROUND,
                  }
                : null,
          });
        } else {
          console.log("Days doesnot have date and is not current date")
          cardData.push({
            id: day,
            cardSet: day == 4 || day == 6 ? 2 : 1,
            cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND,
            status: DailyCardStatus.inactive,
            extras:
              day == 7
                ? {
                    name: "Gift Card",
                    number: 1,
                    background:
                      AssetPack.backgrounds.DAILY_CARD_EXTRA_BACKGROUND,
                  }
                : null,
          });
        }
      });
      setDailyCardData(cardData);
    }
  }, [currentWeekDaily]);

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
