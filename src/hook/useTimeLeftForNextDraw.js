import { useState, useEffect } from "react";

const useTimeLeftForNextDraw = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMondayNineAM = new Date();

      const dayOfWeek = now.getDay();
      const daysUntilNextMonday = (8 - dayOfWeek) % 7;

      nextMondayNineAM.setDate(now.getDate() + daysUntilNextMonday);
      nextMondayNineAM.setHours(9, 0, 0, 0);

      if (dayOfWeek === 1 && now > nextMondayNineAM) {
        nextMondayNineAM.setDate(nextMondayNineAM.getDate() + 7);
      }

      const difference = nextMondayNineAM - now;

      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setTimeLeft(timeLeft);
    };

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return [timeLeft];
};

export default useTimeLeftForNextDraw;
