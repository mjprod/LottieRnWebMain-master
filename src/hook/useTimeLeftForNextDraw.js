import { useState, useEffect } from "react";

const useTimeLeftForNextDraw = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const options = {
      timeZone: 'Australia/Sydney',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      weekday: 'short',
    };

    const parts = new Intl.DateTimeFormat('en-AU', options).formatToParts(now);

    const weekdayString = parts.find(p => p.type === 'weekday').value;

    let dateParts = {};
    parts.forEach(({ type, value }) => {
      if (type !== 'literal') {
        dateParts[type] = value;
      }
    });

    const sydneyDateString = `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;

    const weekdayMapping = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const nextMondayNineAM = new Date(sydneyDateString);

    const dayOfWeek = weekdayMapping[weekdayString];
    const daysUntilNextMonday = (8 - dayOfWeek) % 7;
    nextMondayNineAM.setDate(nextMondayNineAM.getDate() + daysUntilNextMonday);
    nextMondayNineAM.setHours(0, 0, 0, 0);
    if (dayOfWeek === 1 && now > nextMondayNineAM) {
      nextMondayNineAM.setDate(nextMondayNineAM.getDate() + 7);
    }

    const difference = nextMondayNineAM - now;


    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return [timeLeft];
};

export default useTimeLeftForNextDraw;
