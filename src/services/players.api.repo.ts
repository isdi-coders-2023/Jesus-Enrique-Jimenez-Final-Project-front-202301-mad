import { Player, ServerPlayer } from '../models/players';

export class PlayersRepo {
  url: string;
  constructor() {
    this.url = 'http://localhost:6500/players';
  }
  async loadPlayers(): Promise<ServerPlayer> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
    const data = await resp.json();
    return data;
  }

  async loadOnePlayer(id: Player['id']): Promise<ServerPlayer> {
    const url = this.url + '/' + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
    const data = await resp.json();

    return data;
  }

  async createPlayer(
    player: Partial<Player>,
    token: string
  ): Promise<ServerPlayer> {
    const url = this.url + '/create';

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(player),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
    const data = await resp.json();
    return data;
  }

  async updatePlayer(
    player: Partial<Player>,
    token: string
  ): Promise<ServerPlayer> {
    const url = this.url + '/edit';
    const resp = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(player),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
    const data = await resp.json();
    return data;
  }

  async deletePlayer(id: Player['id'], token: string): Promise<void> {
    const url = this.url + '/' + id;
    console.log(token);

    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (!resp.ok)
      throw new Error('Error Http: ' + resp.status + '. ' + resp.statusText);
  }
}
