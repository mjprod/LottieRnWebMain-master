import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

TransparentVideo.propTypes = {
  source: PropTypes.any.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onEnd: PropTypes.func,
  onEnded: PropTypes.func,
};

TransparentVideo.defaultProps = {
  style: {},
  onEnd: () => { },
  onEnded: () => { },
};


export default function TransparentVideo({ source, style, onEnd, onEnded, ...rest }) {
  const browserDetectorBody = {
    chrome: () => (
      <Video
        ref={videoRef}
        source={AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME}
        style={styles.transparentVideo}
        onEnd={onVideoEnd}
        onEnded={onVideoEnd}
      />
    ),
    default: () => (
      <Video
        ref={videoRef}
        source={isAndroidWebView() ? AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME : AssetPack.videos.WIN_LUCKY_SYMBOL}
        style={styles.transparentVideo}
        onEnd={onVideoEnd}
        onEnded={onVideoEnd}
      />
    ),
  }
  return (
    <BrowserDetection>
      <BrowserDetection>

      </BrowserDetection>
    </BrowserDetection>
  )
}