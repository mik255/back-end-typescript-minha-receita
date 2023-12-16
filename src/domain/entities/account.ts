import { UserEntity } from "./user";

export class Account {
    constructor(
        public  token: string,
        public readonly user: UserEntity,
    ) { }
}