import React from "react";
import { Image } from "react-native";
import PropTypes from 'prop-types';

Slide.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

function Slide({ data, height, width }) {
  return (
    <Image
      resizeMode="contain"
      source={{ uri: data.image }}
      style={{ width: width, height: height }}
    />
  );
}
export default Slide;
