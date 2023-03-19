import { Player } from './players';

export type User = {
  id: string;
  email: string;
  userName: string;
  password?: string;
  players: Player[];
  token?: string;
};

export type ServerResp = {
  results: User[];
};
