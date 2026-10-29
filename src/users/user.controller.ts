import { Controller, Get, Param, Post, Body, Delete, Put, NotFoundException, ForbiddenException, UnprocessableEntityException, ParseIntPipe} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Get('email/:email')
    getUserByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Post()
    createUser(@Body() userPayload: CreateUserDto) {
        return this.userService.create(userPayload);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
    
    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
        return this.userService.update(id, changes);
    }
}