import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayers } from '../../hooks/use.players';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import styles from './details.module.scss';
export type CardProps = {
  player: Player;
};
export default function Details() {
  const { id } = useParams();
  const repo = useMemo(() => new PlayersRepo(), []);
  const { playersState, deleteOnePlayer } = usePlayers(repo);

  const playerDetails = playersState.allPlayers.find(
    (item: { id: string | undefined }) => item.id === id
  );
  const handleDelete = () => {
    deleteOnePlayer(playerDetails!.id);
  };

  return (
    <>
      <div className={styles.details}>
        <h2>Detalles del jugador</h2>
        <div className={styles.buttons}>
          <div>
            <Link to={`/home`} relative="path">
              <button className={styles.eliminar} onClick={handleDelete}>
                {' '}
                Eliminar{' '}
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/edit/${id}`} relative="path">
              <button className={styles.editar}> Editar </button>
            </Link>
          </div>
        </div>
        <span>
          <span>
            <div>
              <img
                src={playerDetails?.picture}
                alt="Details"
                className={styles.details__image}
              />
            </div>
            <ul className={styles.cardDetails}>
              <li>Nombre:{playerDetails?.name}</li>
              <li>Nacionalidad:{playerDetails?.nationality}</li>
              <li>Edad:{playerDetails?.age}</li>
              <li>Pie preferido:{playerDetails?.preferredFoot}</li>
              <li>Posicion:{playerDetails?.position}</li>
            </ul>
          </span>
        </span>
        <div className={styles.button_container}>
          <Link to={'/home'}>
            <button className={styles.volver}>Volver al listado</button>
          </Link>
        </div>
      </div>
    </>
  );
}
