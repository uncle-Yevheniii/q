import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/userCreate.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(data: UserCreateDto) {
    const existUser = await this.userRepository.findOne({ where: { username: data.username } });
    if (existUser) throw new BadRequestException('Username already exists');

    const hashedPassword = await argon.hash(data.password);

    const user = this.userRepository.create({ ...data, password: hashedPassword });
    return await this.userRepository.save(user);
  }
}
