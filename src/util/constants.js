export const SERVER = "http://localhost:8083";

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
