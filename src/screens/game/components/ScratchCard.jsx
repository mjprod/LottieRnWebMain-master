import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { eraserRadius, heightScratch, widthScratch } from "../../../global/Settings";
import AssetPack from "../../../util/AssetsPack";

const ScratchCard = ({ autoScratch, onScratch, onLoading, setScratchStarted }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [totalArea, setTotalArea] = useState(0);
  const [erasedArea, setErasedArea] = useState(0);
  const radius = eraserRadius;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });

    const img = new Image();
    img.src = AssetPack.images.SCRATCH_CARD_FOREGROUND;

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = widthScratch;
      canvas.height = heightScratch;

      // Draw the image on the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Set the composite operation to allow for erasing
      context.globalCompositeOperation = "destination-out";
      setTotalArea(canvas.width * canvas.height);
      setImageLoaded(true);
      onLoading(false);
    };

    return () => {
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, [canvasRef]);

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

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
          updateErasedArea();
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

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let erasedPixelCount = 0;

    // Count transparent pixels
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) { // Alpha channel fully transparent
        erasedPixelCount++;
      }
    }

    // Calculate the total number of pixels
    const totalPixelCount = canvas.width * canvas.height;

    // Calculate the erased area as a proportion of the total area
    const erasedArea = erasedPixelCount / totalPixelCount;

    setErasedArea(erasedArea * totalArea); // Update the erased area state
  };

  useEffect(() => {
    if (totalArea > 0) {
      const percentageErased = (erasedArea / totalArea) * 100;
      //console.log("Percentage Erased:", percentageErased);
      if (onScratch) {
        onScratch(percentageErased);
        if (percentageErased > 0) {
          setScratchStarted(true);
        }
      }
    }
  }, [erasedArea, totalArea, onScratch]);


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
