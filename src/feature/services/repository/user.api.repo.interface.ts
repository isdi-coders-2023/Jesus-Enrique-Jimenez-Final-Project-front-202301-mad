import { UserStructure } from '../../models/users.js';

export interface Repo<T> {
  readAll(token: string): Promise<T>;
  readOne(id: UserStructure['id'], token: string): Promise<T>;
  create(userInfo: Partial<UserStructure>, action: string): Promise<T>;
  update(
    userInfo: Partial<UserStructure>,
    action: string,
    token: string
  ): Promise<T>;
}
