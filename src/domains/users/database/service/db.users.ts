import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UsersModel } from '../models/users.models';

@Injectable()
export class DBUsersService {
  constructor(
    @Inject('UsersModel') private modelClass: ModelClass<UsersModel>,
  ) {}

  async insert(data: Partial<UsersModel>) {
    return this.modelClass.query().insert(data).returning('*');
  }

  async getUser(query: Partial<UsersModel>, ...args: string[]) {
    return this.modelClass
      .query()
      .select(...args)
      .where(query)
      .first();
  }
}
