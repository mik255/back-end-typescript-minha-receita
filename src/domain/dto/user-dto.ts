import { UserEntity } from "../entities/user";

export class UserLoginOutputDto {
        id: string;
        nome: string;
        avatarUrl: string | null;
        email: string;
}


export class UserCredentialsInputDto {
    id: string;
    nome: string;
    avatarImgUrl: string;
    email: string;
}

export class UserOutputDto {
    constructor(
        public id: string,
        public nome: string,
        public avatarImgUrl: string,
        public email: string,
    ) { }
}