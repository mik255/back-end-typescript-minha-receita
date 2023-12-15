import { UserEntity } from "../entities/user"

export interface AccountRepository {
    createUser(user: UserEntity): Promise<UserEntity>
    login(email: string, password: string): Promise<UserEntity>
    getUserById(id: string): Promise<UserEntity>
}
