import { Controller, Get, Param, Post, Body, Delete, Put, NotFoundException, ForbiddenException, UnprocessableEntityException} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.FindById(id);
    }

    @Get('name/:name')
    getUserByName(@Param('name') name: string) {
        return this.userService.search(name);
    }

    @Post()
    createUser(@Body() userPayload: CreateUserDto) {
        return this.userService.create(userPayload);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
    /*
    @Get()
    getUsers() {
        return this.users;
    }

    @Get('name/:name')
    getUserByName(@Param('name') name: string) {
        console.log('Buscando usuario con nombre: ' + name);
        const search = name.trim().toLowerCase();
        const data = this.users.find(user => user.name.toLowerCase() === search);
        if (!data) {
            console.log('Usuario no encontrado');
            throw new NotFoundException('Usuario con nombre ' + name + ' no existe');
        }
        console.log('Usuario encontrado: ', data);
        return data?.email;
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        console.log('Buscando usuario con id: ' + id);
        const user = this.users.find(user => user.id === id);
        console.log('.:: Usuario encontrado: ', user);
        if (user === undefined) {
            throw new NotFoundException('Usuario con id ' + id + ' no existe');
        }

        // simulacion para error de permisos
        if (user.id === '1') {
            throw new ForbiddenException('Usuario con id ' + id + ' no tiene permisos para ser accedido');
        }
        return user;
    }

    @Post()
    createUser(@Body() userPayload: CreateUserDto) {
        console.log('Creando usuario: ', userPayload);

        const newUser = {
            ...userPayload,
            id: `${new Date().getTime()}`,
            nickname: userPayload.name.substring(0, 3) + '123'
        };
        this.users.push(newUser);
        return { message: 'Usuario creado', data: newUser };
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex(user => user.id === id);
        if (position === -1) {
            throw new NotFoundException('Usuario con id ' + id + ' no existe');
        }
        this.users.splice(position, 1);
        return { message: 'Usuario eliminado' };
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
        throw new NotFoundException(`Usuario con ID ${id} no existe`);
    }
    const currentData = this.users[position];
    const updateUser = {
        ...currentData,
        ...changes,
    };
    this.users[position] = updateUser;

        return {
            msg: 'Usuario actualizado',
            data: updateUser,
        };
    } 
    */
}