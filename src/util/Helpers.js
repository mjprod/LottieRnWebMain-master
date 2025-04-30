export function maskString(str, showLetters = 3) {
  return str.length > showLetters ? str.substring(0, showLetters) + "***" : str + "***";
}
export function isAndroidWebView() {
  const ua = navigator.userAgent || "";
  const isAndroidWebView = ua.includes("wv") || (ua.includes("Android") && ua.includes("Version/"));
  return isAndroidWebView;
}
export function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  return formattedDate;
}

export function getCurrentWeekDates() {
  let today = new Date();
  let dayOfWeek = today.getDay();

  let monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(formatDate(date));
  }

  return weekDates;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export function convertUTCToLocal(utcDateTime) {
  const date = new Date(utcDateTime + 'Z');
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Australia/Sydney',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const second = parts.find(p => p.type === 'second').value;
  return `${year}-${month}-${day}`;
}

export function getDayOfWeek() {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    weekday: 'short',
  });

  const weekday = formatter.format(date); 

  const weekdayMap = {
    'Sun': 7,
    'Mon': 1,
    'Tue': 2,
    'Wed': 3,
    'Thu': 4,
    'Fri': 5,
    'Sat': 6
  };

  return weekdayMap[weekday];
}
