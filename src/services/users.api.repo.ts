import { Player } from '../models/players';
import { ServerUser, User } from '../models/users';

export class UsersApiRepo {
  url: string;

  constructor() {
    this.url = 'http://localhost:6500/users';
  }

  async create(userInfo: Partial<User>, action: string): Promise<ServerUser> {
    const url = this.url + '/' + action;

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as ServerUser;

    return userData;
  }

  async readId(idUser: User['id'], token: string): Promise<ServerUser> {
    const url = this.url + '/' + idUser;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as ServerUser;

    return userData;
  }

  async update(
    idPlayer: Player['id'],
    token: string,
    action: string
  ): Promise<ServerUser> {
    const url = this.url + '/' + action + '/cart/' + idPlayer;

    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as ServerUser;

    return userData;
  }
}
