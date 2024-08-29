import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';

// Dimensions of the window
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// Scratch card component
const ScratchCardScreen = () => {
  const canvasRef = useRef(null);
  const [scratching, setScratching] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    setCtx(context);

    const img = new Image();
    img.src = require('./../assets/image/scratch_foreground.jpg'); // Correct way to handle image imports

    img.onload = () => {
      canvas.width = windowWidth;
      canvas.height = windowHeight;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'destination-out';
    };

    return () => {
      // Cleanup on component unmount
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, [canvasRef]);

  const handleMouseMove = (event) => {
    if (scratching && ctx) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const handleMouseDown = () => setScratching(true);
  const handleMouseUp = () => setScratching(false);

  const simulateErase = () => {
    if (!ctx) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const radius = 20;
    const xStart = radius;
    const yStart = radius;
    const xEnd = canvas.width;
    const yEnd = canvas.height;

    // Drawing eraser effect over the entire canvas
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    for (let x = xStart; x < xEnd; x += radius * 2) {
      for (let y = yStart; y < yEnd; y += radius * 2) {
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  return (
    <View style={styles.container}>
      <canvas
        ref={canvasRef}
        style={styles.canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={scratching ? "Stop Scratching" : "Start Scratching"}
          onPress={() => setScratching(!scratching)}
        />
        <Button
          title="Erase All"
          onPress={simulateErase}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: windowWidth,
    height: windowHeight,
    border: '1px solid black', // Border to visualize the canvas area
    backgroundColor: '#35363A',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust based on your preference
    zIndex: 1,  // Ensure button is above the canvas
  },
});

export default ScratchCardScreen;
