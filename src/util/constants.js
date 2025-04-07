export const SERVER = process.env.REACT_APP_SERVER_URL;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const BONUS_PACK_NUMBER_OF_CARDS = 12;

export const Endpoint = {
  fetch_user_details: SERVER + "/users",
  get_daily_question: SERVER + "/daily/question",
  post_daily_answer: SERVER + "/daily/answer",
  leader_board: SERVER + "/leaderboard",
  games: SERVER + "/game",
  update_card_played: SERVER + "/game/update_card_played",
  update_lucky_symbol: SERVER + "/game/update_lucky_symbol",
  update_card_balance: SERVER + "/game/update_card_balance",
  update_score: SERVER + "/game/update_score",
  login: SERVER + "/login",
  token: SERVER + "/login/token",
  logout: SERVER + "/login/logout",
  winners: SERVER + "/winners"
}


export const DailyCardStatus = {
  active: "active",
  inactive: "inactive",
  completed: "completed",
};

export const GameStatus = {
  online: "online",
  drawing: "drawing",
  check_winner: "check winner",
};

export const LeaderBoardStatus = {
  up: "up",
  down: "down",
  same: "same",
};


export const Dimentions = {
  pageMargin: 20,
  contentPadding: 24,
  sectionMargin: 32,
  marginXS: 8,
  marginS: 16,
  marginM: 24,
  marginL: 32,
  marginXL: 48,
};

export const Colors = {
  background: "#0A0A0A",
  transparent: "#00000000",

  jokerGold400: "#FFDEA8",
  jokerGold600: "#A88C5D",
  jokerGold1000: "#1D1A11",
  jokerBlack50: "#A6A6A6",
  jokerBlack200: "#3D3D3D",
  jokerBlack800: "#131313",

  jokerWhite50: "#FFFFFF",

  jokerGreen400: "#3EDB58"
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
  TekoRegular: "Teko-Regular",
};