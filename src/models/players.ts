export type Player = {
  id: string;
  name: string;
  nationality: string;
  age: number;
  position: string;
  preferredFoot: string;
  picture: string;
  creator: string;
};

export type ServerPlayer = {
  results: Player[];
};
