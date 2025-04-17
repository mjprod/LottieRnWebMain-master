import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { eraserRadius, heightScratch, widthScratch } from "../../../global/Settings";
import AssetPack from "../../../util/AssetsPack";

const ScratchCard = ({ onScratch, setScratchStarted }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [totalArea, setTotalArea] = useState(0);
  // Refs for performance optimization
  const ctxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const erasedAreaRef = useRef(0);
  const lastReportedPercentRef = useRef(0);
  const radius = eraserRadius;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = AssetPack.images.SCRATCH_CARD_FOREGROUND;

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = widthScratch;
      canvas.height = heightScratch;

      const context = canvas.getContext("2d", { willReadFrequently: true });
      // Cache context for future drawing
      ctxRef.current = context;

      // Draw the image on the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Set the composite operation to allow for erasing
      context.globalCompositeOperation = "destination-out";
      setTotalArea(canvas.width * canvas.height);
      setImageLoaded(true);
    };

    return () => {
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (event.type === "touchmove") {
          const touch = event.touches[0];
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        } else {
          x = event.clientX - rect.left;
          y = event.clientY - rect.top;
        }

        const ctx = ctxRef.current;
        if (ctx) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
          // Throttle erase-area calculation to animation frames
          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(() => {
              updateErasedArea();
              animationFrameRef.current = null;
            });
          }
        }
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleMouseMove);

      return () => {
        if (canvas) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("touchmove", handleMouseMove);
        }
      };
    }
  }, [imageLoaded, canvasRef]);

  const updateErasedArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = ctxRef.current;

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let erasedPixelCount = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        erasedPixelCount++;
      }
    }

    const totalPixelCount = canvas.width * canvas.height;
    // Store in ref to avoid re-renders
    erasedAreaRef.current = (erasedPixelCount / totalPixelCount) * totalArea;

    // Compute percentage and only notify if >=1% change
    const percent = (erasedAreaRef.current / totalArea) * 100;
    if (onScratch && percent - lastReportedPercentRef.current >= 1) {
      lastReportedPercentRef.current = percent;
      onScratch(percent);
      if (percent > 0) {
        setScratchStarted(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          width: widthScratch,
          height: widthScratch,
          touchAction: "none",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScratchCard;
