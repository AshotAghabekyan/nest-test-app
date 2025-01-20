import { PatchUserDto, UserDto } from "../model/user.dto"
import { UserEntity } from "../model/user.model";



export interface IUserRepository {
    findUserById(id: number): Promise<UserEntity>,
    findUserByEmail(email: string): Promise<UserEntity>,
    findAllUsers(): Promise<UserEntity[]>,
    deleteUser(id: number): Promise<boolean>,
    createUser(userDto: UserDto): Promise<UserEntity>,
    updateUser(id: number, patchUserDto: PatchUserDto): Promise<UserEntity>
}


export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
