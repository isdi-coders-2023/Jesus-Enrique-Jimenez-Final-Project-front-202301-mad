import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import { Card } from '../card/card';
import styles from './playerList.module.scss';

export function PlayersList() {
  const repo = useMemo(() => new PlayersRepo(), []);
  const { playersState, loadPlayers } = usePlayers(repo);
  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);
  return (
    <>
      <div className={styles.players}>
        <div>
          <Link to={'/details'}></Link>
        </div>
      </div>
      <Link to={`/create`} relative="path">
        <button className={styles.crear}> Crear Jugador</button>
      </Link>
      <ul className={styles.allPlayers}>
        {playersState.allPlayers.map((item: Player) => (
          <Card player={item} key={item.id}></Card>
        ))}
      </ul>
    </>
  );
}
