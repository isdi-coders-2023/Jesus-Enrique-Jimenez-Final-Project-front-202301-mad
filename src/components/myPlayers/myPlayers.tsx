import { useMemo } from 'react';
import { useUsers } from '../../hooks/use.users';
import { Player } from '../../models/players';
import { UsersApiRepo } from '../../services/users.api.repo';
import { Card } from '../card/card';
import Header from '../header/header';
import styles from './myPlayers.module.scss';

export default function MyPlayers() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { users } = useUsers(userRepo);

  const userPlayers = users.userLogged.players;

  function handlerPrevButton(_arg0: number) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Header></Header>
      <section className={styles.myPlayers}>
        <div className={styles.myplayersHeader}>
          <h2 className={styles.myplayersHeaderTitle}>MyPlayers</h2>
        </div>

        <div className={styles.myplayersCardList}>
          <ul className={styles.myplayersCard}>
            {userPlayers.map((item: Player) => (
              <Card key={item.id} player={item}></Card>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
