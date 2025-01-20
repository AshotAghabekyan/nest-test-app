import { Controller, Get, Post, Delete, Param, Req, ParseIntPipe, Body, Patch, UseGuards, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { PatchUserDto, SearchUserDto, UserDto, UserResponseDto } from './model/user.dto';
import { UserEntity } from './model/user.model';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';





@ApiTags('Users') 
@Controller('/users')
export class UserController {
    private readonly userService: UserService;
    
    constructor(userService: UserService) {
        this.userService = userService;
    }


    @Get('/search')
    @ApiOperation({ summary: 'Find a user by email' })
    @ApiBody({description: "email of target user", type: SearchUserDto})
    @ApiResponse({  type: UserResponseDto })
    public async findUserByEmail(@Body() body: SearchUserDto) {
        const email: string = body.email;
        const user: UserEntity = await this.userService.findUserByEmail(email);
        return new UserResponseDto(user);
    }


    @Get('/:id')
    @ApiOperation({ summary: 'Find a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ type: UserResponseDto })
    public async findUserById(@Param('id', ParseIntPipe) userId: number) {
        const user: UserEntity = await this.userService.findUserById(userId);
        return new UserResponseDto(user);
    }


    @UseGuards(AuthGuard)
    @Get('/')
    @ApiOperation({ summary: 'Find all users' })
    @ApiResponse({  type: [UserResponseDto] })
    public async findAllUsers() {
        const allUsers: UserEntity[] = await this.userService.findAllUsers();
        return allUsers.map((user: UserEntity) => new UserResponseDto(user));
    }


    @Post('/')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: UserDto })
    @ApiResponse({ type: UserResponseDto })
    public async createUser(@Body() userDto: UserDto) {
        const createdUser: UserEntity = await this.userService.createUser(userDto);
        return new UserResponseDto(createdUser);
    }


    @UseGuards(AuthGuard)
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted', type: Boolean})
    public async deleteUser(@Param('id', ParseIntPipe) userId: number, @Req() req: Request) {
        const reqUserId: number = req['user'].id;
        if (reqUserId !== userId) {
            throw new ForbiddenException('Permission denied!');
        }
        const isDeleted: boolean = await this.userService.deleteUser(userId);
        return { isDeleted };
    }


    @UseGuards(AuthGuard)
    @Patch('/:id')
    @ApiOperation({ summary: 'Update user information' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: 200, description: 'User information updated', type: UserResponseDto })
    public async updateUserInfo(@Param('id', ParseIntPipe) userId: number, @Body() patchUserDto: PatchUserDto, @Req() req: Request) {
        const reqUserId: number = +req['user'].id;
        if (reqUserId !== userId) {
            throw new ForbiddenException('Permission denied!');
        }

        return this.userService.updateUser(userId, patchUserDto);
    }
}
