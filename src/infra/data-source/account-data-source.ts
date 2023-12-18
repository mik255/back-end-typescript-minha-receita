import { AccountEntity } from "../../domain/entities/account";
import { Credentials } from "../../domain/entities/credentials";
import { UserEntity } from "../../domain/entities/user";
import { UserNotFoundError } from "../exeptions/account-exeptions";
import { UserSchema } from "../orm/user";


export interface AccountDataSource {
    createUser(user: any): Promise<UserEntity>
    login(email: string, password: string): Promise<AccountEntity>
    getUserById(id: string): Promise<UserEntity>
}

export class AccountDataSourceImpl implements AccountDataSource {
    async getUserById(id: string): Promise<UserEntity> {
        console.log('id',id);
        var userData = await UserSchema.findById(id);
        console.log('userdata',userData);
        return userData;
    }
    async createUser(user: any): Promise<any> {
        const userExists = await UserSchema.findOne({ 'credentials.email': user.credentials.email }).exec();
        if (userExists) {
            throw new Error("Usuário já existe");
        }
        console.log(user);
        return UserSchema.create(user);
    }
    async login(email: string, password: string): Promise<AccountEntity> {
        try {
            var user = await UserSchema.findOne({ 'credentials.email': email, 'credentials.password': password }).exec();
            if (user) {
                return new AccountEntity(
                    new UserEntity(
                        user._id.toString(),
                        user.nome,
                        user.avatarUrl,
                        new Credentials(user.credentials.email, user.credentials.password)
                    ),
                )
            } else {
                throw new UserNotFoundError();
            }
        } catch (err) {
            throw err;
        }

    }
}