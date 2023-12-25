
import { FileInputDTO } from "./file-dto";
import { UserOutputDto } from "./user-dto";
export class AccountLoginInputDTO {
    constructor(
        public email: string,
        public password: string,
    ) { }
}

export class AccountLoginOutputDTO {
    constructor(
        public token: string,
        public user: UserOutputDto,
    ) { }
}

export class AccountCreateInputDTO {
    constructor(
        public nome: string,
        public email: string,
        public password: string,
    ) { }
}

export class AccountOutputDTO {
    constructor(
        public token: string,
        public user: UserOutputDto,
    ) { }
}