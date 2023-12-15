import { UserEntity } from "../../domain/entities/user";
import { AccountUseCase } from "../../domain/use-cases/account/account-usecase";

export interface AccountUseCaseApplication{
    createUser(user: any): Promise<UserEntity>
    login(email: string, password: string): Promise<UserEntity>
    getUserById(id: string): Promise<UserEntity>
}

export class AccountUseCaseApplicationImpl implements AccountUseCaseApplication {
    private accountUsecase: AccountUseCase;
    constructor(accountUsecase: AccountUseCase){
        this.accountUsecase = accountUsecase;
    }
    getUserById(id: string): Promise<any> {
        return this.accountUsecase.getUserById(id);
    }
     createUser(user: any): Promise<any> {
        return this.accountUsecase.createUser(user);
    }
     login(email: string, password: string): Promise<any> {
        return this.accountUsecase.login(email, password);
    }
}