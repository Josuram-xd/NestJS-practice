import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findById(id: number) {
        return await this.findOne(id);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException('Usuario con email ' + email + ' no existe');
        }
        return user;
    }

    async create(userPayload: CreateUserDto) {
        const { email, password } = userPayload;
        const newUser = this.userRepository.create({ email, password });
        return await this.userRepository.save(newUser);
    }

    async delete(id: number) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return user;
    }

    async update(id: number, changes: UpdateUserDto) {
        const user = await this.findOne(id);
        const { email, password } = changes;
        this.userRepository.merge(user, { email, password });
        return await this.userRepository.save(user);
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Usuario con id ' + id + ' no existe');
        }
        return user;
    }
}
