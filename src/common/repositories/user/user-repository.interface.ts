export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  findOne(criteria: { firebaseUid: string }): Promise<any | null>;
  create(data: { firebaseUid: string }): Promise<any>;
}

