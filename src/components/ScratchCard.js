import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
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
} from "../global/Settings";
//import { set } from "react-native/Libraries/Utilities/Dimensions";
//import {WorkletFunction} from 'react-native-reanimated/lib/typescript/commonTypes';

const scratch_foreground_thumbnail = require("./../assets/image/scratch_foreground.jpg");

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ScratchCard = ({
  imageSource,
  autoScratch,
  onScratch,
  setReset,
  onLoading,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scratchPoints, setScratchPoints] = useState([]);
  const [lastAnimationPoint, setLastAnimationPoint] = useState({ x: 0, y: 0 });
  const [lastAnimationTime, setLastAnimationTime] = useState(0);
  const canvasRef = useRef(null);
  const [totalArea, setTotalArea] = useState(0);
  const [erasedArea, setErasedArea] = useState(0);
  const [erasedMap, setErasedMap] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [isVisibleThumbnail, setIsVisibleThumbnail] = useState(true);

  const [soundLastCalled, setSoundLastCalled] = useState(0);

  const animationThreshold = 100;
  const animationDebounceTime = 100;

  const eraserPosX = 0;
  const eraserPosY = 0;

  const [ctx, setCtx] = useState(null);
  //const [scratching, setScratching] = useState(false);

  const radius = eraserRadius;


  const names_file = [
    "ui_scratch_1.mp3",
    "ui_scratch_2.mp3",
    "ui_scratch_3.mp3",
    "ui_scratch_4.mp3",
    "ui_scratch_5.mp3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

          await new Promise((resolve) => {
            //animateEraser(startX, startY, endX, endY, duration, resolve);
            //triggerVibration('light');
            //playSoundAnimation();
          });
        } else {
          const startX = imageOffset.x + edgeMargin;
          const startY = y + imageDimensions.width - edgeMargin;
          const endX = imageOffset.x + imageDimensions.width - edgeMargin;
          const endY = y;

          await new Promise((resolve) => {
            //animateEraser(startX, startY, endX, endY, duration, resolve);
            //triggerVibration('light');
            //playSoundAnimation();
          });
        }
        direction = !direction;
      }
    };

    eraseAnimation();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    setCtx(context);

    const img = new Image();
    img.src = require("./../assets/image/scratch_foreground.jpg");

    img.onload = () => {
      canvas.width = windowWidth;
      canvas.height = windowHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "destination-out";
      setTotalArea(canvas.width * canvas.height); 
      setImageLoaded(true);
      onLoading(false);
    };

    return () => {
      // Cleanup on component unmount
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, [canvasRef]);

  useEffect(() => {
    if (autoScratch) {
      console.log("Auto scratch enabled, starting erasing...");
      startErasing();
    }
  }, [autoScratch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(eraserPosX.value, eraserPosY.value, eraserRadius, 0, Math.PI * 2);
      ctx.fill();
      
    }, 16);

    return () => clearInterval(interval);
  }, [eraserPosX, eraserPosY]);

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
      .map((point) => (
        <LottieView
          key={point.id}
          source={require("./../assets/lotties/lottieScratchParticles.json")}
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
            setScratchPoints((points) =>
              points.filter((p) => p.id !== point.id)
            );
          }}
        />
      ));
  };

  const updateErasedArea = (x, y) => {
    const areaErased = Math.PI * radius * radius; // Area of a circle with radius
    setErasedArea((prev) => prev + areaErased);
  };

  const handleMouseMove = (event) => {
   //if (scratching && ctx) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      updateErasedArea(x, y);
    //}
  };

 // const handleMouseDown = () => setScratching(true);
  //const handleMouseUp = () => setScratching(false);

  return (
    <View
      style={[styles.container]}
    >
      <View style={{ }}>
        {
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            //onMouseDown={handleMouseDown}
            //onMouseUp={handleMouseUp}
            //onMouseLeave={handleMouseUp}
          />
        }
        {/*!isVisibleThumbnail && (
              <ImageBackground
                resizeMode="cover"
                source={scratch_foreground_thumbnail}
                style={styles.iconLose}
              />
            )*/}
      </View>
      {renderScratchAnimations()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  canvas: {
    flex: 1,
    //height: windowHeight,
    backgroundColor: "transparent",
  },
  scratchAnimation: {
    position: "absolute",
    width: 150,
    height: 150,
  },
  iconLose: {
    width: windowWidth,
    height: "100%",
  },
});

export default ScratchCard;
