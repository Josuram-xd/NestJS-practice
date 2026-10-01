import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {

    private users: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            isActive: true
        }, 
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            isActive: false
        }, 
        {
            id: "3",
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            isActive: true
        },
        {
            id: "4",
            name: "Bob",
            email: "bob@example.com",
            isActive: false
        },
        {
            id: "5",
            name: "Adolfito",
            email: "adolfitohitler@example.com",
            isActive: true
        }
    ]

    findAll(): User[] {
        return this.users.filter(user => user.isActive);
    }

    FindById(id: string): User | undefined {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('Usuario con id ' + id + ' no existe');
        }
        return user;
    }

    search(name: string): User | undefined {
        const data = this.users.find(user => user.name === name);
        if (!data) {
            throw new NotFoundException('Usuario con nombre ' + name + ' no existe');
        }
        return data;
    }

    create(userPayload: CreateUserDto) {
        const newUser = {
            ...userPayload,
            id: `${new Date().getTime()}`,
            nickname: userPayload.name.substring(0, 3) + '123',
            isActive: true
        };
        this.users.push(newUser);
        return newUser;
    }
    
    delete(id: string) {
    const position = this.users.findIndex(user => user.id === id);
        if (position === -1) {
            throw new NotFoundException('Usuario con id ' + id + ' no existe');
        }   
        this.users.splice(position, 1);
        return { message: 'Usuario con id ' + id + ' eliminado correctamente' };
    }
}