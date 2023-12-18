import { UserEntity } from "./user";

export class AccountEntity {
    constructor(
        public  user: UserEntity,
    ) { }
}