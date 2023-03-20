import { User } from './users';

export type Player = {
  id: string;
  email: string;
  userName: string;
  password?: string;
  creator: User;
  token?: string;
};

export type ServerResp = {
  results: Player[];
};
