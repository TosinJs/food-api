import { BaseModel } from "../base.model";

export class UsersModel extends BaseModel {
    static get tableName() {
        return 'Users'
    }

    username: string;
    password: string;
    role: string;
}