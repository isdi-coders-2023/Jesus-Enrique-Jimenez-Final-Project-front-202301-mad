import { useMemo, SyntheticEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { newImage } from '../../firebase/firebasePlayers';
import { usePlayers } from '../../hooks/use.players';
import { useUsers } from '../../hooks/use.users';
import { Player } from '../../models/players';
import { PlayersRepo } from '../../services/players.api.repo';
import { UsersApiRepo } from '../../services/users.api.repo';
import styles from './form.module.scss';

export default function Form() {
  const usersState = useUsers(new UsersApiRepo());

  const navigate = useNavigate();
  const { id } = useParams();
  const repo = useMemo(() => new PlayersRepo(), []);

  const { playersState, createPlayer, updatePlayer } = usePlayers(repo);

  let playerItem: Partial<Player> | undefined = playersState.allPlayers.find(
    (item) => item.id === id
  );
  const type = playerItem === undefined ? 'add' : 'update';
  let imageLink = '';
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = event.currentTarget as HTMLFormElement;

    const urlPicture = (formData.elements[1] as HTMLFormElement).files[0];
    if (urlPicture) {
      imageLink = await newImage(
        (formData.elements[0] as HTMLFormElement).value,
        urlPicture
      );
    } else {
      imageLink = playerItem?.picture!;
    }

    const newPlayer: Partial<Player> | undefined = {
      name: (formData.elements[0] as HTMLFormElement).value,
      age: +(formData.elements[2] as HTMLFormElement).value,
      picture: imageLink,
      nationality: (formData.elements[4] as HTMLFormElement).value,
      preferredFoot: (formData.elements[5] as HTMLFormElement).value,
      position: (formData.elements[3] as HTMLFormElement).value,
      creator: usersState.users.user.id,
    };

    if (type === 'add') {
      createPlayer(newPlayer as Player);
    } else if (type === 'update') {
      newPlayer.id = playerItem!.id;
      updatePlayer(newPlayer);
      navigate(`/details/${playerItem!.id}`);
    }

    formData.reset();
  };

  return (
    <div className={styles.form}>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={playerItem?.name}
          required
          placeholder="Name"
        />
        <input type="file" name="image" id="image" placeholder="Image" />
        <input
          type="number"
          name="age"
          id="age"
          defaultValue={playerItem?.age}
          required
          placeholder="Age"
        />
        <input
          type="text"
          name="position"
          id="position"
          defaultValue={playerItem?.position}
          required
          placeholder="Position"
        />
        <input
          type="text"
          name="nationality"
          id="nationality"
          defaultValue={playerItem?.nationality}
          required
          placeholder="Nationality"
        />
        <input
          type="text"
          name="preferredFoot"
          id="preferredFoot"
          defaultValue={playerItem?.preferredFoot}
          required
          placeholder="PreferredFoot"
        />
        <div className={styles.guardar}>
          <button type="submit">Guardar</button>{' '}
        </div>
        <div className={styles.button}>
          <Link to={'/home'}>
            <button className={styles.volver}>Volver al listado</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
