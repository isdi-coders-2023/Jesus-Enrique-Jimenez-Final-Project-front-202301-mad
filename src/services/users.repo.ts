import { ServerResp, User } from '../models/users.js';
import { Repo } from './user.repo.interface';

export class UsersRepo implements Repo<ServerResp> {
  url: string;

  constructor() {
    this.url = 'http://localhost:6500/users';
  }

  // async readAll(token: string): Promise<ServerResp> {
  //   const resp = await fetch(this.url, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   });

  //   if (!resp.ok)
  //     throw new Error('Error http: ' + resp.status + resp.statusText);

  //   const users = (await resp.json()) as ServerResp;

  //   return users;
  // }

  // async readOne(id: User['id'], token: string): Promise<ServerResp> {
  //   const url = this.url + '/' + id;

  //   const resp = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   });

  //   if (!resp.ok)
  //     throw new Error('Error http: ' + resp.status + resp.statusText);

  //   const users = (await resp.json()) as ServerResp;

  //   return users;
  // }

  async create(userInfo: Partial<User>, action: string): Promise<ServerResp> {
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

    const userData = (await resp.json()) as ServerResp;

    return userData;
  }

  async update(
    userInfo: Partial<User>,
    action: string,
    token: string
  ): Promise<ServerResp> {
    const url = this.url + '/' + action;

    const resp = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(userInfo),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);

    const userData = (await resp.json()) as ServerResp;

    return userData;
  }
}
