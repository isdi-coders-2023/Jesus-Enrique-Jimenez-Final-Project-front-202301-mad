import { UsersApiRepo } from './users.api.repo';

describe('Given UsersApiRepo class and its instance', () => {
  let repo: UsersApiRepo;

  beforeEach(() => {
    repo = new UsersApiRepo();
  });

  describe('When the create method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          userName: 'test',
        }),
      });

      const result = await repo.create({ userName: 'test' }, 'actionTest');
      expect(result).toEqual({ userName: 'test' });
    });

    test('Then if the fetch response is NOT, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.create({ userName: 'test' }, 'actionTest');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the readId method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          userName: 'test',
        }),
      });

      const result = await repo.readId('idTest', 'tokenTest');
      expect(result).toEqual({ userName: 'test' });
    });

    test('Then if the fetch response is NOT, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.readId('idTest', 'tokenTest');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the update method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          userName: 'test',
        }),
      });

      const result = await repo.update('idTest', 'tokenTest', 'actionTest');
      expect(result).toEqual({ userName: 'test' });
    });

    test('Then if the fetch response is NOT, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.update('idTest', 'tokenTest', 'actionTest');
      await expect(result).rejects.toThrow();
    });
  });
});
