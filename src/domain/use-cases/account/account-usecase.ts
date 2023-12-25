import { AccountCreateInputDTO, AccountOutputDTO, AccountLoginInputDTO } from "../../dto/account-dto";
import { FileInputDTO, FileOutputDTO } from "../../dto/file-dto";
import { UserOutputDto } from "../../dto/user-dto";
import { Credentials } from "../../entities/credentials";
import { UserEntity } from "../../entities/user"
import { AccountRepository } from "../../repositories/account-repository";
import { IImageService } from "../../services/image-service";
import { IJwtService } from "../../services/jwt-service";
const { v4: uuidv4 } = require('uuid');
export interface AccountUseCase {
    createUser(accountCreateInputDTO: AccountCreateInputDTO): Promise<AccountOutputDTO>
    login(accountLoginInputDTO: AccountLoginInputDTO): Promise<AccountOutputDTO>
    getUserById(id: string): Promise<UserEntity>
}

export class AccountUseCaseImpl implements AccountUseCase {
    private accountRepository: AccountRepository;
    private iImageService: IImageService;
    private jwtService: IJwtService;
    constructor(accountRepository: AccountRepository, iImageService: IImageService, jwtService: IJwtService) {
        this.accountRepository = accountRepository;
        this.iImageService = iImageService;
        this.jwtService = jwtService;
    }
    async getUserById(id: string): Promise<UserEntity> {
       var user = await this.accountRepository.getUserById(id);
       user.credentials.password = undefined;
       return user;
    }
    async createUser(accountCreateInputDTO: AccountCreateInputDTO): Promise<AccountOutputDTO> {
        var fileOutputDTOAvatar:FileOutputDTO;
        try {
            var credentials = new Credentials(accountCreateInputDTO.email, accountCreateInputDTO.password);
            credentials.validate();
            var user = new UserEntity(
                uuidv4(),
                accountCreateInputDTO.nome,
                null,
                credentials
            );


            var token = this.jwtService.generateToken(user.id);
         

            var user = await this.accountRepository.createUser(user);
            var userDto = new UserOutputDto(
                user.id,
                user.nome,
                user.avatarUrl,
                user.credentials.email
            );
            return new AccountOutputDTO(
                token,
                userDto

            );
        } catch (e) {
           // await this.iImageService.deleteImage(fileOutputDTOAvatar);
            throw new Error(e.message);
        }

    }
    async login(accountLoginInputDTO: AccountLoginInputDTO): Promise<AccountOutputDTO> {
        var credentials = new Credentials(accountLoginInputDTO.email, accountLoginInputDTO.password);
        credentials.validate();
        var account = await this.accountRepository.login(credentials);
        var user = account.user;
        var token = this.jwtService.generateToken(user.id);
        var userDto = new UserOutputDto(
            user.id,
            user.nome,
            user.avatarUrl,
            user.credentials.email
        );
        return new AccountOutputDTO(
            token,
            userDto
        );
    }
}