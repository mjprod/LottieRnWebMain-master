import { useState, useRef, useEffect, useCallback } from 'react';

function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  // clear any existing interval
  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // start counting down (optionally from a new value)
  const startTimer = useCallback((fromSeconds = seconds) => {
    clear();
    setSeconds(fromSeconds);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 2) {
          clear();
          return 1;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clear, seconds]);

  // pause the countdown
  const pauseTimer = useCallback(() => {
    clear();
  }, [clear]);

  // reset to a specific value (or back to the initial)
  const resetTimer = useCallback((toSeconds = initialSeconds) => {
    clear();
    setSeconds(toSeconds);
  }, [clear, initialSeconds]);

  // clean up on unmount
  useEffect(() => clear, [clear]);

  return {
    seconds,
    timerIsRunning: !!intervalRef.current,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}

export default useTimer;