import React, { useState, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import { FlatList, View, Text, Pressable } from "react-native";
import Slide from "./Slide";
import { Colors } from "../../../util/constants";

ShowCaseCarousel.propTypes = {
  slideList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  style: PropTypes.object,
};

function ShowCaseCarousel({ slideList = [], style }) {
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const indexRef = useRef(index);
  const listRef = useRef();

  indexRef.current = index;
  const prevSlide = () => {
    if (index > 0) {
      const newIndex = index - 1;
      listRef.current.scrollToOffset({
        offset: dimensions.width * 0.8 * newIndex,
      });
    }
  };
  const nextSlide = () => {
    if (index < slideList.length) {
      const newIndex = index + 1;
      listRef.current.scrollToOffset({
        offset: dimensions.width * 0.8 * newIndex,
      });
    }
  };
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

  return (
    <View style={{ flex: 1, overflow: "visible", ...style }} >
      <FlatList
        ref={listRef}
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
              height={dimensions.height} />
          );
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={dimensions.width * 0.8}
        onScroll={onScroll}
      />
      <Text
        style={{
          color: Colors.jokerBlack50,
          paddingTop: 20,
          paddingHorizontal: 50,
          fontSize: 14,
          height: 50,
          textAlign: "center",
        }}>
        {slideList[index].description}
      </Text>

      <View
        style={{
          position: "absolute",
          width: "100%",
          top: "40%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}>
        <Pressable onPress={prevSlide} disabled={index === 0}>
          <Text style={{ fontSize: 50, color: index === 0 ? Colors.jokerBlack900 : Colors.jokerWhite50 }}>
            {"‹"}
          </Text>
        </Pressable>

        <Pressable
          onPress={nextSlide}
          disabled={index === slideList.length - 1}>
          <Text
            style={{
              fontSize: 50,
              color: index === slideList.length - 1 ? Colors.jokerBlack900 : Colors.jokerWhite50,
            }}>
            {"›"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ShowCaseCarousel;
