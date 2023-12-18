import { Credentials } from "./credentials";

export class UserEntity {
    constructor(
        public id: string,
        public nome: string,
        public avatarUrl: string | null,
        public credentials: Credentials,
    ) {}
}
