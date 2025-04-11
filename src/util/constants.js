export const SERVER = process.env.REACT_APP_SERVER_URL;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const BONUS_PACK_NUMBER_OF_CARDS = 12;

export const Endpoint = {
  fetch_user_details: "/users",
  get_daily_question: "/daily/question",
  post_daily_answer: "/daily/answer",
  leader_board: "/leaderboard",
  games: "/game",
  update_card_played: "/game/update_card_played",
  update_lucky_symbol: "/game/update_lucky_symbol",
  update_card_balance: "/game/update_card_balance",
  update_score: "/game/update_score",
  login: "/login",
  token: "/login/token",
  logout: "/login/logout",
  winners: "/winners"
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
  innerCardPadding: 20,
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
  black: "#000000",
  transparent: "#00000000",

  jokerGold400: "#FFDEA8",
  jokerGold40040: "#FFDEA866",
  jokerGold600: "#A88C5D",
  jokerGold900: "#382E23",
  jokerGold1000: "#1D1A11",

  jokerBlack50: "#A6A6A6",
  jokerBlack100: "#5F5F5F",
  jokerBlack200: "#3D3D3D",
  jokerBlack300: "#262626",
  jokerBlack600: "#1B1B1B",
  jokerBlack700: "#171717",
  jokerBlack800: "#131313",
  jokerBlack1100: "#0A0A0A",

  jokerWhite50: "#FFFFFF",

  jokerGreen400: "#3EDA41",
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