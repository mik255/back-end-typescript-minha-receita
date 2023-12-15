import { UserEntity } from "../../domain/entities/user";
import { AccountRepository } from "../../domain/repositories/account-repository";
import { AccountDataSource } from "../data-source/account-data-source";
import { UserNotFoundError } from "../exeptions/account-exeptions";


export class AccountRepositoryImpl implements AccountRepository {
    accountDataSource: AccountDataSource;
    constructor(accountDataSource: AccountDataSource) {
        this.accountDataSource = accountDataSource;
    }
    getUserById(id: string): Promise<UserEntity> {
        return this.accountDataSource.getUserById(id);
    }
    async createUser(user: UserEntity): Promise<UserEntity> {
        return this.accountDataSource.createUser(user);
    }
    async login(email: string, password: string): Promise<UserEntity> {
        try {
            var user = await this.accountDataSource.login(email, password);
            return user;
        } catch (err) {
            if (err.message == "User not found") {
                throw new UserNotFoundError();
            }
            throw err;
        }
    }
}