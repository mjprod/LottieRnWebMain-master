import { useNavigate } from 'react-router-dom';

const useAppNavigation = () => {
    const navigate = useNavigate();

    const appNavigation = {
        goBack: () => {
            navigate(-1);
        },
        goToDailyPage: (user_id, name, email) => {
            navigate("/daily", {
                state: {
                    name: name,
                    email: email,
                    user_id: user_id
                },
            });
        },
        goToStartPage: (user_id, name, email) => {
            navigate("/start", {
                state: {
                    username: name,
                    email: email,
                    id: user_id
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
                    id: user_id,
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
    };

    return appNavigation;
};

export default useAppNavigation;