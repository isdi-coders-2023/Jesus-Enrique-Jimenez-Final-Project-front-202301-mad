import { Player } from './players';

export type User = {
  results: any;
  id: string;
  email: string;
  userName: string;
  password?: string;
  players: Player[];
  token?: string;
};

export type ServerUser = {
  results: User[];
};
