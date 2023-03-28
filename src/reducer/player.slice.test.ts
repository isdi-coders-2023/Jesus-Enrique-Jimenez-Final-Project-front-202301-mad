import { PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../models/players';
import { playerReducer, PlayerState } from './players.slice';

describe('Given the playerSlice with payload and initial state mocked', () => {
  let mockInitialState: PlayerState;
  let mockPayload: Player;

  beforeEach(() => {
    mockInitialState = {
      allPlayers: [],
      player: {} as Player,
    };

    mockPayload = {
      id: '2',
      name: 'test',
      picture: 'test',
      preferredFoot: 'test',
      age: 2,
      position: 'test',
      nationality: 'test',
      creator: 'test',
    };
  });

  describe('When the read action is called', () => {
    test('Then, if the initial state allPlayers is empty, it should return the payload in the allPlayers property of the state', () => {
      const mockReadAction: PayloadAction<Player[]> = {
        type: 'player/read',
        payload: [mockPayload],
      };
      const result = playerReducer(mockInitialState, mockReadAction);
      expect(result).toEqual({
        allPlayers: [mockPayload],
        player: {},
      });
    });
  });

  describe('When the readId action is called', () => {
    test('Then, if the initial state player is empty, it should return the payload in the player property of the state', () => {
      const mockReadIdAction: PayloadAction<Player> = {
        type: 'player/readId',
        payload: mockPayload,
      };
      const result = playerReducer(mockInitialState, mockReadIdAction);
      expect(result).toStrictEqual({
        allPlayers: [],
        player: mockPayload,
      });
    });
  });

  describe('When the create action is called', () => {
    test('Then, if the initial state allPlayers is empty, it should return the payload in the allPlayers property of the state', () => {
      const mockCreateAction: PayloadAction<Player> = {
        type: 'player/create',
        payload: mockPayload,
      };
      const result = playerReducer(mockInitialState, mockCreateAction);
      expect(result).toEqual({
        allPlayers: [mockPayload],
        player: {},
      });
    });
  });

  describe('When the update action is called', () => {
    test('Then, if the initial state allPlayers is an Array of mockPayload and mockPlayer, it should return the allPlayers state with the mockUpdateAction', () => {
      mockInitialState = {
        allPlayers: [mockPayload],
        player: {} as Player,
      };

      const mockUpdateAction: PayloadAction<Player> = {
        type: 'player/update',
        payload: {
          id: 'test',
          name: 'test',
          picture: 'test',
          preferredFoot: 'test',
          age: 2,
          position: 'test',
          nationality: 'test',
          creator: 'test',
        },
      };
      const result = playerReducer(mockInitialState, mockUpdateAction);
      expect(result).toBe({
        allPlayers: [
          {
            name: 'test',
            preferredFoot: 'test',
            age: 2,
            position: 'test',
            nationality: 'test',
            creator: 'test',
            picture: 'test',
          },
        ],
        player: {},
      });
    });
  });

  describe('When the deletePlayer action is called', () => {
    test('Then, if the initial state allPlayers is an Array of mockPayload and mockPlayer, it should return the payload in the allPlayers property of the state', () => {
      mockInitialState = {
        allPlayers: [mockPayload],
        player: {} as Player,
      };

      const mockDeleteAction: PayloadAction<Player['id']> = {
        type: 'player/deletePlayer',
        payload: '2',
      };
      const result = playerReducer(mockInitialState, mockDeleteAction);
      expect(result).toEqual({
        allPlayers: [],
        player: {},
      });
    });
  });
});
