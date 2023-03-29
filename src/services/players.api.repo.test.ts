import { Player } from '../models/players';
import { PlayersRepo } from './players.api.repo';

const mockPlayersRepo = new PlayersRepo();

describe('Given the player repo', () => {
  describe('When create a new instance and call method loadPlayers', () => {
    test('Then it should return the values loaded', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([{ name: 'player' }]),
      });

      expect(mockPlayersRepo).toBeInstanceOf(PlayersRepo);
      const loadAll = await mockPlayersRepo.loadPlayers();
      expect(loadAll).toEqual([{ name: 'player' }]);
    });
  });

  describe('When it calls the method loadOnePlayer', () => {
    test('Then it should return the value of one player', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '1', name: 'player1' }),
      });

      const getOnePlayer = await mockPlayersRepo.loadOnePlayer('1');
      expect(getOnePlayer).toEqual({ id: '1', name: 'player1' });
    });
  });

  describe('When it calls the method createPlayer', () => {
    const mockPlayer = {
      name: 'player2',
      nationality: 'brazilian',
    } as unknown as Player;
    test('Then it should return the value created', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({ name: 'player2', nationality: 'brazilian' }),
      });

      await mockPlayersRepo.createPlayer(mockPlayer, 'token');
      expect(mockPlayer).toEqual({
        name: 'player2',
        nationality: 'brazilian',
      });
    });
  });

  describe('When it calls the method update', () => {
    const updatedPlayer = {
      id: '2',
      name: 'player2',
      nationality: 'brazilian',
    } as unknown as Player;
    test('Then it should return the updated value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: '2',
          name: 'player2',
          nationality: 'brazilian',
        }),
      });
      await mockPlayersRepo.updatePlayer(updatedPlayer, 'token');
      expect(updatedPlayer).toEqual({
        id: '2',
        name: 'player2',
        nationality: 'brazilian',
      });
    });
    test('Then it should return te updated value', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');
      const result = mockPlayersRepo.updatePlayer(updatedPlayer, 'token');
      await expect(result).rejects.toThrow();
    });
  });
});
describe('When it calls the method delete', () => {
  test('Then it should call fetch with no return', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(),
    });

    const deletePlayers = await mockPlayersRepo.deletePlayer('2', '1');
    expect(fetch).toHaveBeenCalled();
    expect(deletePlayers).toBe(undefined);
  });
});

describe('When loadPlayers method fails', () => {
  test('Then it should throw an error', async () => {
    global.fetch = jest.fn().mockResolvedValue('Error found');
    const loadAll = mockPlayersRepo.loadPlayers();
    await expect(loadAll).rejects.toThrow();
  });
});

describe('When loadOnePlayer method fails', () => {
  test('Then it should throw an error', async () => {
    global.fetch = jest.fn().mockResolvedValue('Error found');
    const getOnePlayer = mockPlayersRepo.loadOnePlayer('1');
    await expect(getOnePlayer).rejects.toThrow();
  });
});

describe('When create method fails', () => {
  const mockCreatedPlayer = {
    email: 'test',
    password: '123',
  } as unknown as Player;
  test('Then it should throw an error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(undefined),
    });
    await expect(
      mockPlayersRepo.createPlayer(mockCreatedPlayer, 'token')
    ).rejects.toThrow();
    expect(fetch).toHaveBeenCalled();
  });
});

describe('When delete method fail', () => {
  test('Then it should throw an error', async () => {
    global.fetch = jest.fn().mockResolvedValue('Error found');
    const deletePlayers = mockPlayersRepo.deletePlayer('2', '1');
    await expect(deletePlayers).rejects.toThrow();
  });
});
