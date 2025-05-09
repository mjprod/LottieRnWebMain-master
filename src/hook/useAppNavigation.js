import { useNavigate } from 'react-router-dom';
import { InfoScreenContents } from '../screens/info/InfoScreen';

const useAppNavigation = () => {
  const navigate = useNavigate();

  const appNavigation = {
    goBack: () => {
      navigate(-1, {
        replace: true,
      });
    },
    goToLaunchScreen: (user_id, name, email) => {
      navigate(`/${user_id}/${name}/${email}`, {
        replace: true,
      });
    },
    goToDailyPage: (user_id, name, email) => {
      navigate("/daily", {
        replace: true,
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
        replace: true,
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
      navigate("/how_to_play", {
      });
    },
    goToNotFoundPage: () => {
      navigate("/not_found", {
        replace: true,
      });
    },
    goToInfoPage: (info) => {
      navigate(`/${info}`, {
        replace: true,
      });
    },
    goToCongratulationsPage: (user_id, name, email) => {
      navigate(`/${InfoScreenContents.congratulations}`, {
        replace: true,
        state: {
          user_id: user_id,
          name: name,
          email: email,
        },
      });
    },
    goToThankYouPage: () => {
      navigate(`/${InfoScreenContents.thank_you}`, {
        replace: true,
      });
    },
    goToInProgressPage: () => {
      navigate(`/${InfoScreenContents.in_progress}`, {
        replace: true,
      }
      );
    },
    goToWeAreExtendingPage: () => {
      navigate(`/${InfoScreenContents.extending}`, {
        replace: true,
      });
    },
  };

  return appNavigation;
};

export default useAppNavigation;