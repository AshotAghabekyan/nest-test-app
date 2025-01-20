import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY_TOKEN } from "./repository/user.repository";
import { PatchUserDto, UserDto } from "./model/user.dto";
import { UserEntity } from "./model/user.model";
import { CryptoProvider } from "../crypto/crypto.provider";



@Injectable()
export class UserService {
    private readonly userRepository: IUserRepository;
    private readonly cryptoProvider: CryptoProvider;

    constructor(
        @Inject(USER_REPOSITORY_TOKEN) userRepository: IUserRepository,
        cryptoProvider: CryptoProvider
    ) {
        this.userRepository = userRepository;
        this.cryptoProvider = cryptoProvider;
    }

    async createUser(userDto: UserDto): Promise<UserEntity> {
        const isUserExist: UserEntity = await this.userRepository.findUserByEmail(userDto.email);
        if (isUserExist) {
            throw new BadRequestException('The user with this email already exist');
        }
        
        userDto.password = await this.cryptoProvider.hash(userDto.password);
        const createdUser: UserEntity = await this.userRepository.createUser(userDto);
        if (!createdUser) {
            throw new InternalServerErrorException("the user doesnt created");
        }
        
        return createdUser;
    }

    async deleteUser(id: number): Promise<boolean> {
        const isUserExist: UserEntity = await this.userRepository.findUserById(id);
        if (!isUserExist) {
            throw new NotFoundException('The user not found');
        }

        const isDeleted: boolean = await this.userRepository.deleteUser(id);
        if (!isDeleted) {
            throw new InternalServerErrorException('the user doesnt deleted');
        }
        return isDeleted;
    }


    async findAllUsers(): Promise<UserEntity[]> {
        const allUsers: UserEntity[] = await this.userRepository.findAllUsers();
        if (!allUsers.length) {
            throw new NotFoundException('users not found');
        }   

        allUsers.forEach((user: UserEntity) => {
            delete user.password
        })
        return allUsers;
    }


    async updateUser(userId: number, patchUserDto: PatchUserDto) {
        const isUserExist: UserEntity = await this.userRepository.findUserById(userId);
        if (!isUserExist) {
            throw new NotFoundException('The user does not found');
        }

        const updatedUser = await this.userRepository.updateUser(userId, patchUserDto);
        if (!updatedUser) {
            throw new InternalServerErrorException('The User does not updated');
        }
        return updatedUser;
    }


    async findUserByEmail(email: string): Promise<UserEntity> {
        const targetUser: UserEntity = await this.userRepository.findUserByEmail(email);
        if (!targetUser) {
            throw new NotFoundException('The user not found');
        }
        delete targetUser.password;
        return targetUser;
    }

    async findUserById(id: number): Promise<UserEntity> {
        const targetUser: UserEntity = await this.userRepository.findUserById(id);
        if (!targetUser) {
            throw new NotFoundException('The user not found');
        }
        delete targetUser.password;
        return targetUser;
    }
}