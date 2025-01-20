import { IPatchUserDto, IUserDto, UserEntity } from "../interfaces/user.interfaces";


export interface IUserRepository {
    findUserById(id: number): Promise<UserEntity>,
    findUserByEmail(email: string): Promise<UserEntity>,
    findAllUsers(): Promise<UserEntity[]>,
    deleteUser(id: number): Promise<boolean>,
    createUser(userDto: IUserDto): Promise<UserEntity>,
    updateUser(id: number, patchUserDto: IPatchUserDto): Promise<UserEntity>
}


export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
