import { Injectable } from '@nestjs/common';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}
