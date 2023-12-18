import { AccountEntity } from "../entities/account"
import { Credentials } from "../entities/credentials"
import { UserEntity } from "../entities/user"

export interface AccountRepository {
    createUser(user: UserEntity): Promise<UserEntity>
    login(credentials: Credentials): Promise<AccountEntity>
    getUserById(id: string): Promise<UserEntity>
}
