import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ImageBackground, Platform} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
//import {
  //useSharedValue,
  //withTiming,
  //Easing,
  //runOnJS,
//} from 'react-native-reanimated';
//import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
//import {PanGestureHandler} from 'react-native-gesture-handler';
import LottieView from "react-native-web-lottie";

//import {triggerVibration} from '../global/Vibration';
//import Sound from 'react-native-sound';

import settings, {
  eraserAnimationSteps,
  eraserDurationAnimation,
  eraserRadius,
  timerSoundBetweenScratchWithFinger,
} from '../global/Settings';
//import {WorkletFunction} from 'react-native-reanimated/lib/typescript/commonTypes';

const scratch_foreground_thumbnail = require('./../assets/image/scratch_foreground.jpg');

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const ScratchCard = ({
  imageSource,
  autoScratch,
  onScratch,
  setReset,
  onLoading,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scratchPoints, setScratchPoints] = useState([]);
  const [lastAnimationPoint, setLastAnimationPoint] = useState({x: 0, y: 0});
  const [lastAnimationTime, setLastAnimationTime] = useState(0);
  const canvasRef = useRef(null);
  const [totalArea, setTotalArea] = useState(0);
  const [erasedArea, setErasedArea] = useState(0);
  const [erasedMap, setErasedMap] = useState([]);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
  const [imageOffset, setImageOffset] = useState({x: 0, y: 0});
  const [isVisibleThumbnail, setIsVisibleThumbnail] = useState(true);

  const [soundLastCalled, setSoundLastCalled] = useState(0);

  const animationThreshold = 100;
  const animationDebounceTime = 100;

  //const eraserPosX = useSharedValue(-eraserRadius);
  //const eraserPosY = useSharedValue(-eraserRadius);
 const eraserPosX = 0;
  const eraserPosY = 0;

  //let isPlaying = false;
  //let whoosh: Sound | null = null;

  const names_file = [
    'ui_scratch_1.mp3',
    'ui_scratch_2.mp3',
    'ui_scratch_3.mp3',
    'ui_scratch_4.mp3',
    'ui_scratch_5.mp3',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  //Sound.setCategory('Playback');

  const animateEraser = (
    startX,
    startY,
    endX,
    endY,
    duration,
    resolve:
      | ((...args: unknown[]) => unknown)
      | (
          | ((...args: unknown[]) => unknown)
          | {__remoteFunction: (...args: unknown[]) => unknown}
        )
      | WorkletFunction<unknown[], unknown>,
  ) => {
    'worklet';
    //eraserPosX.value = withTiming(startX, {duration: 0});
    //eraserPosY.value = withTiming(startY, {duration: 0});
    //eraserPosX.value = withTiming(endX, {duration, easing: Easing.linear});
    //eraserPosY.value = withTiming(
      //endY,
      //{duration, easing: Easing.linear},
      //() => {
       // runOnJS(resolve)();
      //},
    //);
  };

  /*const playSoundFinger = (): void => {
    if (!settings.soundOn) {
      return;
    }
    const currentTime = Date.now();
    if (currentTime - soundLastCalled < timerSoundBetweenScratchWithFinger) {
    
      return;
    }
    setSoundLastCalled(currentTime);

    if (isPlaying || whoosh) {
      return;
    }

    whoosh = new Sound(names_file[currentIndex], Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        isPlaying = false;
        return;
      }
      isPlaying = true;

      whoosh?.play(success => {
        if (success) {
          if (currentIndex >= names_file.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
          //console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        whoosh?.release();
        whoosh = null;
      });
    });

    if (whoosh) {
      whoosh.setVolume(1);
      whoosh.setNumberOfLoops(-1);
      whoosh.getCurrentTime(seconds => console.log('At ' + seconds));
    }
  };
*/
  

  const startErasing = () => {
    const duration = eraserDurationAnimation;
    const step = eraserAnimationSteps;
    const edgeMargin = 20;

    const eraseAnimation = async () => {
      let direction = true;
      for (
        let y = imageOffset.y - imageDimensions.height + edgeMargin;
        y < imageDimensions.height + imageOffset.y - edgeMargin + step;
        y += step
      ) {
        if (direction) {
          const startX = imageOffset.x + imageDimensions.width - edgeMargin;
          const startY = y;
          const endX = imageOffset.x + edgeMargin;
          const endY = y + imageDimensions.width - edgeMargin;

          await new Promise(resolve => {
            animateEraser(startX, startY, endX, endY, duration, resolve);
            //triggerVibration('light');
            //playSoundAnimation();
          });
        } else {
          const startX = imageOffset.x + edgeMargin;
          const startY = y + imageDimensions.width - edgeMargin;
          const endX = imageOffset.x + imageDimensions.width - edgeMargin;
          const endY = y;

          await new Promise(resolve => {
            animateEraser(startX, startY, endX, endY, duration, resolve);
            //triggerVibration('light');
            //playSoundAnimation();
          });
        }
        direction = !direction;
      }
    };

    eraseAnimation();
  };

  const loadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not initialized');
      return;
    }
    setImageLoaded(false);
    onLoading(true);

    if (dimensions.width === 0 || dimensions.height === 0) {
      console.log('Invalid canvas dimensions', dimensions);
      return;
    }

    const ctx = canvas.getContext('2d');
    const resolvedImageSource = (imageSource);
    console.log('Resolved Image source:', resolvedImageSource);

    const img = new CanvasImage(canvas);
    img.src = resolvedImageSource.uri;

    
    img.addEventListener('load', () => {
      console.log('Image loaded successfully');

      const drawWidth = windowWidth;
      const drawHeight = img.height * (windowWidth / img.width);

      canvas.width = drawWidth;
      canvas.height = drawHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      setImageDimensions({width: drawWidth, height: drawHeight});
      setImageOffset({
        x: (dimensions.width - drawWidth) / 2,
        y: (dimensions.height - drawHeight) / 2,
      });

      setImageLoaded(true);
      onLoading(false);
      setTotalArea(drawWidth * drawHeight);

      setReset(true);

      try {
        const maxCanvasSize = 10000;
        const width = Math.floor(canvas.width);
        const height = Math.floor(canvas.height);

        if (
          width > 0 &&
          height > 0 &&
          width <= maxCanvasSize &&
          height <= maxCanvasSize
        ) {
          const newErasedMap = Array.from({length: width}, () =>
            Array(height).fill(false),
          );
          setErasedMap(newErasedMap);
        } else {
          console.error('Invalid canvas dimensions', {width, height});
        }
      } catch (error) {
        console.error('Error initializing erased map:', error);
      }
    });

    img.addEventListener('error', e => {
      console.error('Error loading image:', e);
    });
    
  };

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && !imageLoaded) {
      loadImage();
    }
  }, [imageSource, dimensions, imageLoaded]);

  useEffect(() => {
    if (autoScratch) {
      console.log('Auto scratch enabled, starting erasing...');
      startErasing();
    }
  }, [autoScratch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    const interval = setInterval(() => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(eraserPosX.value, eraserPosY.value, eraserRadius, 0, Math.PI * 2);
      ctx.fill();
    }, 16);

    return () => clearInterval(interval);
  }, [eraserPosX, eraserPosY]);

  const handleGesture = evt => {
    const {x, y} = evt.nativeEvent;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const offsetX = x - imageOffset.x;
    const offsetY = y - imageOffset.y;

    if (
      offsetX >= 0 &&
      offsetX <= imageDimensions.width &&
      offsetY >= 0 &&
      offsetY <= imageDimensions.height
    ) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, eraserRadius, 0, Math.PI * 2);
      ctx.fill();

      const circleArea = Math.PI * Math.pow(eraserRadius, 2);
      let newErasedArea = 0;

      const newErasedMap = erasedMap.map(arr => arr.slice());
      let vibrate = false;
      let addAnimation = false;
      /*
      for (
        let i = Math.max(0, Math.floor(offsetX - eraserRadius));
        i < Math.min(canvas.width, Math.ceil(offsetX + eraserRadius));
        i++
      ) {
        for (
          let j = Math.max(0, Math.floor(offsetY - eraserRadius));
          j < Math.min(canvas.height, Math.ceil(offsetY + eraserRadius));
          j++
        ) {
          if (newErasedMap[i] && newErasedMap[i][j] === false) {
            const dx = i - offsetX;
            const dy = j - offsetY;
            if (dx * dx + dy * dy <= eraserRadius * eraserRadius) {
              newErasedMap[i][j] = true;
              newErasedArea += 1;
              vibrate = true;
              addAnimation = true;
            }
          }
        }
      }*/
      if (vibrate) {
        //playSong(require('../../assets/audio/sfx_scratch.aac'));
        //triggerVibration('light');
        //playSoundFinger();
      }
      setErasedMap(newErasedMap);
      setErasedArea(prevArea => prevArea + newErasedArea);

      const currentTime = Date.now();
      if (
        addAnimation &&
        currentTime - lastAnimationTime > animationDebounceTime
      ) {
        const distance = Math.sqrt(
          Math.pow(offsetX - lastAnimationPoint.x, 2) +
            Math.pow(offsetY - lastAnimationPoint.y, 2),
        );
        if (distance > animationThreshold) {
          const id = new Date().getTime() + Math.random();
          setScratchPoints(points => [...points, {id, x, y}]);
          setLastAnimationPoint({x: offsetX, y: offsetY});
          setLastAnimationTime(currentTime);
        }
      }
    } else {
      console.log('Touch outside the image area.');
    }
  };

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsVisibleThumbnail(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  useEffect(() => {
    if (totalArea > 0) {
      const percentageErased = (erasedArea / totalArea) * 100;
      if (onScratch) {
        onScratch(percentageErased);
      }
    }
  }, [erasedArea, totalArea, onScratch]);

  const renderScratchAnimations = () => {
    return scratchPoints
      .filter((_, index) => index % 1 === 0)
      .map(point => (
        <LottieView
          key={point.id}
          source={require('./../assets/lotties/lottieScratchParticles.json')}
          style={[
            styles.scratchAnimation,
            {
              left: point.x - 75,
              top: point.y - 75,
            },
          ]}
          speed={1}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setScratchPoints(points => points.filter(p => p.id !== point.id));
          }}
        />
      ));
  };

  return (
    <View
        style={[styles.container, {height: imageDimensions.height || 'auto'}]}
        onLayout={event => {
          const {width, height} = event.nativeEvent.layout;
          if (width !== dimensions.width || height !== dimensions.height) {
            setDimensions({width, height});
            setImageLoaded(false);
            onLoading(true);
          }
        }}>
        {/*<PanGestureHandler onGestureEvent={handleGesture}>*/}
          <View
            style={{width: '100%', height: imageDimensions.height || 'auto'}}>
            {
              
              <Canvas
              ref={canvasRef}
              style={[styles.canvas, {height:windowHeight,width: windowWidth}]}
            />
            }
            {!isVisibleThumbnail && (
              <ImageBackground
                resizeMode="cover"
                source={scratch_foreground_thumbnail}
                style={styles.iconLose}
              />
            )}
          </View>
          {/*</PanGestureHandler>*/}
        { renderScratchAnimations()}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  canvas: {
    flex: 1,
    //height: windowHeight,
    backgroundColor: 'transparent',
  },
  scratchAnimation: {
    position: 'absolute',
    width: 150,
    height: 150,
  },
  iconLose: {
    width: windowWidth,
    height: '100%',
  },
});

export default ScratchCard;
