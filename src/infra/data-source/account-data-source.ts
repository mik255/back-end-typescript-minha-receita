import { Account } from "../../domain/entities/account";
import { UserEntity } from "../../domain/entities/user";
import { UserNotFoundError } from "../exeptions/account-exeptions";
import { UserSchema } from "../orm/user";


export interface AccountDataSource {
    createUser(user: any): Promise<UserEntity>
    login(email: string, password: string): Promise<Account>
    getUserById(id: string): Promise<UserEntity>
}

export class AccountDataSourceImpl implements AccountDataSource {
    async getUserById(id: string): Promise<UserEntity> {
        
        var userData = await UserSchema.findById(id).exec();
        console.log('userData', userData);
        return userData;
    }
    async createUser(user: any): Promise<any> {
        var isUserExists = await UserSchema.findOne({ email: user.email }).exec();
        if (isUserExists) {
            throw new Error("Usuário já existe");
        }
        return UserSchema.create(user);
    }
    async login(email: string, password: string): Promise<Account> {
        try {
            var user = await UserSchema.findOne({ email, password }).exec();
            if (user) {
                return new Account(
                    "",
                    user,
                )
            } else {
                throw new UserNotFoundError();
            }
        } catch (err) {
            console.log(err);
            if (err.message == "Cannot read properties of null (reading 'id')") {
                throw new UserNotFoundError();
            }
            throw err;
        }

    }
}