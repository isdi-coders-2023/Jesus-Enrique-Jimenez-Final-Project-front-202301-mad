export type UserStructure = {
  id: string;
  email: string;
  userName: string;
  password?: string;
  players: UserStructure[];
  token?: string;
};

export type ServerResp = {
  results: UserStructure[];
};
