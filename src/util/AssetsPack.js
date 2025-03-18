import { Howl } from "howler";
const AssetPack = {
  icons: {
    CARDS: require("./../assets/icons/icon_cards_normal.svg"),
    CARDS_GREEN: require("./../assets/icons/icon_cards_green.svg"),
    ICON_404: require("./../assets/icons/404.svg"),
    ARROW_LEFT: require("./../assets/icons/icon_back.svg"),
    LUCKY_SYMBOL: require("./../assets/image/icon_lucky_symbol.png"),
    TICKET: require("./../assets/image/icon_ticket.png"),
  },
  logos: {
    TURBO_SCRATCH: require("./../assets/image/turbo_scratch_logo.png"),
  },
  backgrounds: {
    GAME: require("./../assets/image/background_game.png"),
    DAILY_CARD_BACKGROUND: require("./../assets/image/day_card_background.png"),
    DAILY_CARD_EXTRA_BACKGROUND: require("./../assets/image/day_card_extra_background.png"),
    CARD_NUMBER_SET: require("./../assets/image/card_set_number_background.svg"),
    CARD_NUMBER_SET_COMPLETED: require("./../assets/image/card_set_number_completed.svg"),
    CARD_NUMBER_SET_INACTIVE: require("./../assets/image/card_set_number_inactive.svg"),
    BOTTOM_GRADIENT: require("./../assets/image/background_bottom_gradient.svg"),
    TOP_NAV_BACKGROUND: require("./../assets/image/top_nav_background.jpg"),
    GOLDEN_BACKGROUND_GRADIENT: require("./../assets/image/highlightBackgroundGradient.svg"),
    NEXT_DRAW_CARD: require("./../assets/image/next_draw_card_background.png"),
    BLUE_BACKGROUND_CARD: require("./../assets/image/resultsCard.svg"),
    GOLD_RUSH: require("./../assets/image/gold_rush.jpg"),
    LUCKY_SYMBOL: require("./../assets/image/background_result_lucky_symbol.png"),
    GAME_TOP_LAYOUT: require("./../assets/image/background_top_layout.png"),
    GAME_TOP_LAYOUT_RED: require("./../assets/image/background_top_layout_red.png"),
    GAME_TOP_LAYOUT_YELLOW: require("./../assets/image/background_top_layout_yellow.png"),
    GAME_TOP_LAYOUT_GREEN: require("./../assets/image/background_top_layout_green.png"),
  },
  videos: {
    WIN_LUCKY_SYMBOL: require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_safari.mp4"),
    WIN_LUCKY_SYMBOL_CHROME: require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_chrome.webm"),
    LUCKY_SYMBOL_FINAL: require("./../assets/video/lucky_symbol_3d_coin_cut.mp4")
  },
  sounds: {
    COMBO: require(`./../assets/sounds/combo.mp3`),
    NICE_COMBO: require(`./../assets/sounds/nice_combo.mp3`),
    ULTRA_COMBO: require(`./../assets/sounds/ultra_combo.mp3`),
  },
  images: {
    PHAROAH: require("./../assets/image/pharoah.png"),
    CAROUSEL_ITEM_1: require("../assets/image/carousel/carousel_item_1.png"),
    CAROUSEL_ITEM_2: require("../assets/image/carousel/carousel_item_2.png"),
    CAROUSEL_ITEM_3: require("../assets/image/carousel/carousel_item_3.png"),
  },
  lotties: {
    CTA_BUTTON_FULL_WIDTH: require("./../assets/lotties/buttonCallToActionFullWidth.json"),
    CTA_BUTTON_HALF_WIDTH: require("./../assets/lotties/buttonCallToActionHalf.json"),
    CTA_BUTTON_TWO_THIRD: require("./../assets/lotties/buttonCallToActionTwoThird.json"),
    THUMBS_UP: require("./../assets/lotties/lottieThumbsUp.json"),
    CONFETTI: require("../assets/lotties/lottieConfetti.json"),
    COUNT_DOWN: require("../assets/lotties/lottieInitialCountdown.json"),
    COUNT_DOWN_BONUS: require("../assets/lotties/lottieCountdownBonus.json"),
    TICKET_ENTRY: require("../assets/lotties/lottieTicketEntry.json"),
    COMBO_2X: require("../assets/lotties/ComboHolderMaxVersion-2x.json"),
    COMBO_3X: require("../assets/lotties/ComboHolderMaxVersion-3x.json"),
    COMBO_4X: require("../assets/lotties/ComboHolderMaxVersion-4x.json"),
  },
  howls: {
    x4: new Howl({
      src: [require(`./../assets/sounds/combo.mp3`)],
      preload: true,
    }),
    x3: new Howl({
      src: [require(`./../assets/sounds/nice_combo.mp3`)],
      preload: true,
    }),
    x2: new Howl({
      src: [require(`./../assets/sounds/ultra_combo.mp3`)],
      preload: true,
    }),
  }
};

export default AssetPack;
