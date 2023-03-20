import { User } from '../models/users';

export interface Repo<T> {
  create(userInfo: Partial<User>, urlPath: string): Promise<T>;
  update(userInfo: Partial<User>, urlPath: string, token: string): Promise<T>;
}
