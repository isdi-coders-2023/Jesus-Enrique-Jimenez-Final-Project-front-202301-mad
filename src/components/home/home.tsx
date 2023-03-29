import { PlayersList } from '../playerList/playerList';
import styles from './home.module.scss';

export default function HomePage() {
  return (
    <section className={styles.home}>
      <h2>Real Madrid Fantasy</h2>
      <PlayersList></PlayersList>
    </section>
  );
}
