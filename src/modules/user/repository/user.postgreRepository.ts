import { InjectModel } from "@nestjs/sequelize";
import { PatchUserDto, UserDto } from "../model/user.dto";
import { UserEntity } from "../model/user.model";
import { User } from "../model/user.model";
import { IUserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { UserRepositoryException } from "./user.repositoryException";



@Injectable()
export class PostgreUserRepository implements IUserRepository {
    private readonly userModel: typeof User;

    constructor(@InjectModel(User) userModel: typeof User) {
        this.userModel = userModel;
    }

    public async findAllUsers(): Promise<UserEntity[]> {
        try {
            const allUsers: UserEntity[] = await this.userModel.findAll<User>();
            if (!allUsers) {
                throw new Error('users doesnt exist');
            }
            return allUsers;

        }
        catch(error) {
            console.error(error)
            throw new UserRepositoryException('Cannot get an all users');
        }
    }


    public async findUserByEmail(email: string): Promise<UserEntity> {
        try {
            const targetUser: UserEntity = await this.userModel.findOne({where: {email}});
            if (!targetUser) {
                throw new Error('The user with that email doesnt exist');
            }
            return targetUser;
        }
        catch(error) {
            console.error(error)
            throw new UserRepositoryException('Cannot find the user by email')
        }
    }

    
    public async findUserById(id: number): Promise<UserEntity> {
        try {
            const targetUser: UserEntity = await this.userModel.findByPk(id);
            if (!targetUser) {
                throw new Error("The user with that ID doesnt exist");
            }
            return targetUser;
        }
        catch(error) {
            console.error(error)
            throw new UserRepositoryException('Cannot find the user by id')
        }
    }


    public async createUser(userDto: UserDto): Promise<UserEntity> {
        try {
            const createdUser: UserEntity = await this.userModel.create(userDto);
            if (!createdUser) {
                throw new Error('The user doesnt created');
            }
            return createdUser;
        }
        catch(error) {
            console.error(error)
            throw new UserRepositoryException('Cannot create the user')
        }
    }

    
    public async deleteUser(id: number): Promise<boolean> {
        try {
            const deletedRowCount: number = await this.userModel.destroy({where: {id}});
            return Boolean(deletedRowCount);
        }   
        catch(error) {
            console.error(error)
            throw new UserRepositoryException('Cannot delete the user');
        } 
    }


    public async updateUser(id: number, patchUserDto: PatchUserDto): Promise<UserEntity> {
        try {
            const [updatedRows] = await this.userModel.update(patchUserDto, {
                where: {id}
            })

            if (updatedRows == 0) {
                return null;
            } 

            const updatedUser: UserEntity = await this.userModel.findByPk(id);
            return updatedUser;
        }
        catch(error) {
            console.error(error);
            throw new UserRepositoryException('Cannot update user');
        }
    }
}