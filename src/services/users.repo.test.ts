import { UsersRepo } from './users.repo';

describe('Given the UsersRepo', () => {
  let repo: UsersRepo;
  beforeEach(() => {
    repo = new UsersRepo();
  });
  describe('When we call the create function', () => {
    test('Then, it should return ok as the request with the data was', async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.create({}, '/random');
      expect(result).toEqual(mockValue);
    });
    test('Then, if the resp its not ok, it should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('xd');
      const result = repo.create({ id: '1' }, '/random');
      await expect(result).rejects.toThrow();
    });
  });
  describe('When we call the update function', () => {
    test('Then, it should return ok as the request with the data', async () => {
      const mock = { id: '1' };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mock),
      });
      const result = await repo.update({ id: '1' }, 'JustATest', 'ThisTest');
      expect(result).toEqual(mock);
    });
    test('Then, if the resp its not ok, it should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Test');
      const result = repo.update({ id: '1' }, 'JustATest', 'ThisTest');
      await expect(result).rejects.toThrow();
    });
  });
});
