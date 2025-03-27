export const SERVER = process.env.REACT_APP_SERVER_URL;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const Endpoint = {
  fetch_user_details: SERVER + "/users",
  get_daily_question: SERVER + "/daily/question",
  post_daily_answer: SERVER + "/daily/answer",
  leader_board: SERVER + "/leaderboard",
  update_card_played: SERVER + "/game/update_card_played",
  update_lucky_symbol: SERVER + "/game/update_lucky_symbol",
  update_card_balance: SERVER + "/game/update_card_balance",
  update_score:  SERVER + "/game/update_score",
  login: SERVER + "/login",
  token: SERVER + "/login/token",
  logout: SERVER + "/login/logout",
}

export const COLOR_BACKGROUND = "#131313";

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


export const Dimentions = {
  pageMargin: 28,
  sectionMargin: 32,
};

export const Colors = {
  background: "#131313",
  transparent: "#00000000",
};

export const Fonts = {
  InterBold: "Inter-Bold",
  InterExtraBold: "Inter-ExtraBold",
  InterMedium: "Inter-Medium",
  InterRegularItalic: "Inter-Regular-Italic",
  InterRegular: "Inter-Regular",
  InterSemiBoldItalic: "Inter-SemiBold-Italic",
  InterSemiBold: "Inter-SemiBold",
  TekoMedium: "Teko-Medium",
  TekoRecular: "Teko-Regular",
};