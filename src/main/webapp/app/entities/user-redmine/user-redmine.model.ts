import { BaseEntity, User } from './../../shared';

export class UserRedmine implements BaseEntity {
    constructor(
        public id?: number,
        public id_user_redmine?: number,
        public login?: string,
        public token?: string,
        public user?: User,
    ) {
    }
}
