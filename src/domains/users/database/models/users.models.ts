import { Model } from 'objection';

export class UsersModel extends Model {
  static get tableName() {
    return 'Users';
  }
  id: string;
  username: string;
  password: string;
  role: string;
}
