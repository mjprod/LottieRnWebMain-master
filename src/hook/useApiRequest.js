import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserDetailsAPI, getDailyQuestionAPI, getGamesAPI, getLeaderBoardAPI, getWinnerAPI, loginAPI, postDailyAnswerAPI, updateCardBalanceAPI, updateCardPlayedAPI, updateLuckySymbolAPI, updateScoreAPI } from "../api/api";
import { showConsoleError } from "../util/ConsoleMessage";
import useStorage from "./useStorage";

const useApiRequest = () => {

  const { saveData } = useStorage();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      console.log('Suceessfully logged in');
      if (data.accessToken && data.refreshToken) {
        saveData('accessToken', data.accessToken);
        saveData('refreshToken', data.refreshToken);
      }
      queryClient.invalidateQueries(['userDetails']);
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        showConsoleError(error.response.data.error);
      } else {
        showConsoleError('Error creating Beta Block');
      }
    },
  });

  const login = async(user_id, name, email) => {
    return loginMutation.mutateAsync({ user_id, name, email });
  };

  const fetchUserDetailsMutation = useMutation({
    mutationFn: fetchUserDetailsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['userDetails']);
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        showConsoleError(error.response.data.error);
      } else {
        showConsoleError('Error creating Beta Block');
      }
    },
  });

  const fetchUserDetails = async(user_id, name, email) => {
    return fetchUserDetailsMutation.mutateAsync({ user_id, name, email });
  };

  const getWinnerMutation = useMutation({
    mutationFn: getWinnerAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['winner']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error fetching winner';
      showConsoleError(errorMessage);
    },
  });

  const getWinner = async() => {
    return getWinnerMutation.mutateAsync();
  };

  const dailyQuestionMutation = useMutation({
    mutationFn: getDailyQuestionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['dailyQuestion']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error fetching daily question';
      showConsoleError(errorMessage);
    },
  });

  const getDailyQuestion = async(user_id, beta_block_id) => {
    return dailyQuestionMutation.mutateAsync({ user_id, beta_block_id });
  };

  const postDailyAnswerMutation = useMutation({
    mutationFn: postDailyAnswerAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['dailyAnswer']);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || 'Error posting daily answer';
      showConsoleError(errorMessage);
    },
  });

  const postDailyAnswer = async(user_id, question_id, answer, cards_won, beta_block_id) => {
    return postDailyAnswerMutation.mutateAsync({ user_id, question_id, answer, cards_won, beta_block_id });
  };

  const getGamesMutation = useMutation({
    mutationFn: getGamesAPI,
    onSuccess: () => {
      console.log('Games fetched successfully!');
      queryClient.invalidateQueries(['games']);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || 'Error fetching games';
      showConsoleError(errorMessage);
    },
  });

  const getGames = async(user_id, beta_block_id) => {
    return getGamesMutation.mutateAsync({ user_id, beta_block_id });
  };

  const updateCardPlayedMutation = useMutation({
    mutationFn: updateCardPlayedAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['cardPlayed']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error updating card played';
      showConsoleError(errorMessage);
    },
  });

  const updateCardPlayed = async(beta_block_id, user_id, game_id) => {
    return updateCardPlayedMutation.mutateAsync({ beta_block_id, user_id, game_id });
  };

  const updateScoreMutation = useMutation({
    mutationFn: updateScoreAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['score']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error updating score';
      showConsoleError(errorMessage);
    },
  });

  const updateScore = async(user_id, score, game_id, combo_played) => {
    return updateScoreMutation.mutateAsync({ user_id, score, game_id, combo_played });
  };

  const updateLuckySymbolMutation = useMutation({
    mutationFn: updateLuckySymbolAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['luckySymbol']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error updating Lucky Symbol';
      showConsoleError(errorMessage);
    },
  });

  const updateLuckySymbol = async(user_id, lucky_symbol) => {
    return updateLuckySymbolMutation.mutateAsync({ user_id, lucky_symbol });
  };

  const updateCardBalanceMutation = useMutation({
    mutationFn: updateCardBalanceAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['cardBalance']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error updating card balance';
      showConsoleError(errorMessage);
    },
  });

  const updateCardBalance = async(user_id, beta_block_id, card_balance) => {
    return updateCardBalanceMutation.mutateAsync({ user_id, beta_block_id, card_balance });
  };

  const getLeaderBoardMutation = useMutation({
    mutationFn: getLeaderBoardAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(['leaderBoard']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Error fetching leader board';
      showConsoleError(errorMessage);
    },
  });

  const getLeaderBoard = async(beta_block_id, limit, page = 1) => {
    return getLeaderBoardMutation.mutateAsync({ beta_block_id, limit, page });
  };

  return {
    updateLuckySymbol,
    getLeaderBoard,
    updateScore,
    updateCardBalance,
    login,
    loginLoading: loginMutation.isLoading,
    loginError: loginMutation.error,
    fetchUserDetails,
    fetchUserDetailsLoading: fetchUserDetailsMutation.isLoading,
    fetchUserDetailsError: fetchUserDetailsMutation.error,
    getWinner,
    getWinnerLoading: getWinnerMutation.isLoading,
    getWinnerError: getWinnerMutation.error,
    getDailyQuestion,
    getDailyQuestionLoading: dailyQuestionMutation.isLoading,
    getDailyQuestionError: dailyQuestionMutation.error,
    postDailyAnswer,
    postDailyAnswerLoading: postDailyAnswerMutation.isLoading,
    postDailyAnswerError: postDailyAnswerMutation.error,
    getGames,
    getGamesLoading: getGamesMutation.isLoading,
    getGamesError: getGamesMutation.error,
    updateCardPlayed,
    updateCardPlayedLoading: updateCardPlayedMutation.isLoading,
    updateCardPlayedError: updateCardPlayedMutation.error,

  };
};

export default useApiRequest;
