import { Account } from "../../entities/account";
import { UserEntity } from "../../entities/user"
import { AccountRepository } from "../../repositories/account-repository";

export interface AccountUseCase {
    createUser(user: UserEntity): Promise<UserEntity>
    login(email: string, password: string): Promise<Account>
    getUserById(id: string): Promise<UserEntity>
}

export class AccountUseCaseImpl implements AccountUseCase {
    private accountRepository: AccountRepository;
    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }
    getUserById(id: string): Promise<UserEntity> {
        return this.accountRepository.getUserById(id);
    }
    async createUser(user: UserEntity): Promise<UserEntity> {
        // Validações regex

        var user = await this.accountRepository.createUser(user);
        return user;
    }
    async login(email: string, password: string): Promise<Account> {
        return this.accountRepository.login(email, password);
    }
}