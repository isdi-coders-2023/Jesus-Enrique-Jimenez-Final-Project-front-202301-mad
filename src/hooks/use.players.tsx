import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Player } from '../models/players';
import { PlayersRepo } from '../services/players.api.repo';
import {
  read,
  readId,
  create,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update,
  deletePlayer,
} from '../reducer/players.slice';

export function usePlayers(repo: PlayersRepo) {
  const usersState = useSelector((state: RootState) => state.users);
  const playersState = useSelector((state: RootState) => state.players);

  const playersDispatch = useDispatch<AppDispatch>();

  const loadPlayers = useCallback(
    async (_position?: string, _age?: string) => {
      try {
        const userToken = usersState.userLogged.token;

        if (!userToken) throw new Error('Not authorized');

        const playersInfo = await repo.loadPlayers();
        playersDispatch(read(playersInfo.results));
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    [playersDispatch, repo, usersState.userLogged.token]
  );

  const loadOnePlayer = async (_idPlayer: Player['id']) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const playerInfo = await repo.loadOnePlayer(userToken);

      playersDispatch(readId(playerInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const createPlayer = async (infoPlayer: Player) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');
      const playerInfo = await repo.createPlayer(infoPlayer, userToken);

      playersDispatch(create(playerInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updatePlayer = async (infoPlayer: Partial<Player>) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const playerInfo = await repo.updatePlayer(infoPlayer, userToken);

      dispatch(update(playerInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteOnePlayer = async (idPlayer: Player['id']) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');
      console.log(idPlayer);
      const playerId: string = idPlayer;

      await repo.deletePlayer(playerId, userToken);
      console.log(playerId);
      playersDispatch(deletePlayer(playerId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    playersState,
    loadPlayers,
    loadOnePlayer,
    createPlayer,
    updatePlayer,
    deleteOnePlayer,
  };
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
