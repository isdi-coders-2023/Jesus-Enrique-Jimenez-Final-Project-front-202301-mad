import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../models/players';

export type PlayerState = {
  allPlayers: Player[];
  player: Player;
};

const initialState: PlayerState = {
  allPlayers: [],
  player: {} as Player,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,

  reducers: {
    read(state, action: PayloadAction<Player[]>) {
      state.allPlayers = action.payload;
    },

    readId(state, action: PayloadAction<Player>) {
      state.player = action.payload;
    },

    create(state, action: PayloadAction<Player>) {
      state.allPlayers = [...state.allPlayers, action.payload];
    },

    update(state, action: PayloadAction<Player>) {
      const actualInfo = [...state.allPlayers];

      state.allPlayers = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },

    deletePlayer(state, action: PayloadAction<Player['id']>) {
      const actualInfo = [...state.allPlayers];

      state.allPlayers = actualInfo.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { read, readId, create, update, deletePlayer } =
  playerSlice.actions;
export const playerReducer = playerSlice.reducer;
