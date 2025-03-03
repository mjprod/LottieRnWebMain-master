export const SERVER = "http://192.168.128.52:8083";

export const DIMEN_PAGE_MARGIN = 25;

export const DailyCardStatus = {
  active: "active",
  inactive: "inactive",
  completed: "completed",
};

export const LeaderBoardStatus = {
  up: "up",
  down: "down",
  same: "same",
};

export function maskString(str) {
  return str.length > 4 ? str.substring(0, 4) + "***" : str + "***";
}

export function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  return formattedDate;
}

export function convertUTCToLocal(utcDateStr) {
  let utcDate = new Date(utcDateStr + "T00:00:00Z"); // Treat as UTC
  return utcDate.toISOString().split("T")[0]; // Convert to local and return
}
