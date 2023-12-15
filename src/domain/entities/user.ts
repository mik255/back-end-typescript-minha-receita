
export class UserEntity {
    constructor(
        public id: string,
        public nome: string,
        public avatarUrl: string | null,
        public email: string,
        public password: string,
    ) {}
}
