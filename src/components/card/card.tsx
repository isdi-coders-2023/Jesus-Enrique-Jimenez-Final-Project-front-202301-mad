import { Link } from 'react-router-dom';
import { Player } from '../../models/players';
import styles from './card.module.scss';

type CardProps = {
  player: Player;
};

export function Card({ player }: CardProps) {
  return (
    <div>
      <Link to={`/Details/${player.id}`} relative="path">
        <li className={styles.card}>
          <div className={styles.card__element}>
            <img src={player.picture} alt="" />
          </div>
          <div>
            <div className={styles.card__name}>
              <span>{player.name}</span>
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
}
