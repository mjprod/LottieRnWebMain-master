import { Route, Routes } from 'react-router-dom';
import DailyScreen from '../screens/daily/DailyScreen';
import ScratchLuckyGame from '../screens/game/ScratchLuckyGame';
import GameOverScreen from '../screens/GameOverScreen';
import InfoScreen, { InfoScreenContents } from '../screens/info/InfoScreen';
import LauchScreen from '../screens/LauchScreen';
import LeaderBoardScreen from '../screens/LeaderBoardScreen';
import HowToPlayScreen from '../screens/learn/HowToPlayScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import StartScreen from '../screens/StartScreen';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<NotFoundScreen />} />
      <Route path="/daily" element={<DailyScreen />} />
      <Route path="/start" element={<StartScreen />} />
      <Route path="/game" element={<ScratchLuckyGame />} />
      <Route path="/game_over" element={<GameOverScreen />} />
      <Route path="/how_to_play" element={<HowToPlayScreen />} />
      <Route path="/leader_board" element={<LeaderBoardScreen />} />
      <Route path="/:id/:name/:email" element={<LauchScreen />} />
      <Route path="/" element={<LauchScreen />} />
      <Route path={InfoScreenContents.extending} element={<InfoScreen contentName={InfoScreenContents.extending} />} />
      <Route path={InfoScreenContents.thank_you} element={<InfoScreen contentName={InfoScreenContents.thank_you} />} />
      <Route path={InfoScreenContents.in_progress} element={<InfoScreen contentName={InfoScreenContents.in_progress} />} />
      <Route path={InfoScreenContents.congratulations} element={<InfoScreen contentName={InfoScreenContents.congratulations} />} />
    </Routes>
  );
}