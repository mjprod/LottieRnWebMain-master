import { useNavigate } from 'react-router-dom';
import { InfoScreenContents } from '../screens/info/InfoScreen';

const useAppNavigation = () => {
  const navigate = useNavigate();

  const appNavigation = {
    goBack: () => {
      navigate(-1);
    },
    goToLaunchScreen: (user_id, name, email) => {
      navigate(`/${user_id}/${name}/${email}`);
    },
    goToDailyPage: (user_id, name, email) => {
      navigate("/daily", {
        state: {
          name: name,
          email: email,
          user_id: user_id,
        },
      });
    },
    goToStartPage: (user_id, name, email) => {
      navigate("/start", {
        state: {
          username: name,
          email: email,
          id: user_id,
        },
      });
    },
    goToGamePage: (user_id, name, email) => {
      navigate("/game", {
        state: {
          username: name,
          email: email,
          id: user_id,
        },
      });
    },
    goToGameOverPage: (user_id, name, email) => {
      navigate("/game_over", {
        state: {
          username: name,
          email: email,
          user_id: user_id,
        },
      });
    },
    goToLeaderBoardPage: (user_id, name, email) => {
      navigate("/leader_board", {
        state: {
          name: name,
          email: email,
          user_id: user_id,
        },
      });
    },
    goToHowToPlayPage: () => {
      navigate("/how_to_play");
    },
    goToNotFoundPage: () => {
      navigate("/not_found");
    },
    goToInfoPage: (info) => {
      navigate(`/${info}`);
    },
    goToCongratulationsPage: (user_id, name, email) => {
      navigate(`/${InfoScreenContents.congratulations}`, {
        state: {
          user_id: user_id,
          name: name,
          email: email,
        },
      });
    },
    goToThankYouPage: () => {
      navigate(`/${InfoScreenContents.thank_you}`);
    },
    goToInProgressPage: () => {
      navigate(`/${InfoScreenContents.in_progress}`);
    },
    goToWeAreExtendingPage: () => {
      navigate(`/${InfoScreenContents.extending}`);
    },
  };

  return appNavigation;
};

export default useAppNavigation;