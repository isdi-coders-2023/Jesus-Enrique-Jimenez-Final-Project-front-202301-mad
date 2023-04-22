import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import { Card } from '../card/card';
import styles from './playerList.module.scss';

export function PlayersList() {
  const repo = useMemo(() => new PlayersRepo(), []);
  const { playersState, loadPlayers } = usePlayers(repo);
  const [filter, setFilter] = useState('');
  const filteredPlayers = playersState.allPlayers.filter((player) =>
    player.position.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.filter}>
          {/* ... */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por posición"
          />
        </div>
      </div>

      <ul className={styles.allPlayers}>
        {filteredPlayers.map((item: Player) => (
          <Card player={item} key={item.id}></Card>
        ))}
      </ul>
      <div className={styles.button}>
        <Link to={`/create`} relative="path">
          <button className={styles.crear}> Crear Jugador</button>
        </Link>
      </div>
      <div className={styles.players}>
        <div>
          <Link to={'/details'}></Link>
        </div>
        <div className={styles.buttons}>
          <img className={styles.prev} src="./prev.jpg" alt="prev-logo" />
          <img className={styles.next} src="./next.jpg" alt="next-logo" />
        </div>
      </div>
    </>
  );
}
