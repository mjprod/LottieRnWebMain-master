import AssetPack from './../util/AssetsPack';
import { DailyCardStatus } from './../util/constants';

export default [
    { id: "1", cardSet: "1", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.active, extras: null },
    { id: "2", cardSet: "1", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.inactive, extras: null },
    { id: "3", cardSet: "1", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.completed, extras: null },
    { id: "4", cardSet: "2", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.inactive, extras: null },
    { id: "5", cardSet: "1", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.inactive, extras: null },
    { id: "6", cardSet: "2", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.inactive, extras: null },
    { id: "7", cardSet: "1", cardBackground: AssetPack.backgrounds.DAILY_CARD_BACKGROUND, status: DailyCardStatus.inactive, extras: { name: "Gift Card", } },
]
