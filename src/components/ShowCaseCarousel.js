import React, { useState, useRef, useCallback, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import Slide from "./items/Slide";

function ShowCaseCarousel({ slideList = [] }) {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  useEffect(() => {
    console.warn(index);
  }, [index]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDimensions({ width, height });
        }}
        data={slideList}
        renderItem={({ item }) => {
          return (
            <Slide
              data={item}
              width={dimensions.width}
              height={dimensions.height}
            />
          );
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      <Text
        style={{
          paddingHorizontal: 50,
          fontSize: 14,
          height: 50,
          textAlign: "center",
        }}
      >
        {slideList[index].description}
      </Text>
    </View>
  );
}

export default ShowCaseCarousel;
