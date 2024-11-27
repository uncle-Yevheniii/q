import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserUpdateDto, UserCreateDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async signToken(userID: string, username: string) {
    return this.jwt.signAsync({ sub: userID, username });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(data: UserCreateDto) {
    const existUser = await this.getUserByUsername(data.username);
    if (existUser) throw new BadRequestException('Username already exists');

    const hashedPassword = await argon.hash(data.password);

    const user = this.userRepository.create({ ...data, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  async authenticateUser(data: UserCreateDto) {
    const existUser = await this.getUserByUsername(data.username);
    if (!existUser) throw new BadRequestException('Credentials are invalid');

    const isPasswordValid = await argon.verify(existUser.password, data.password);
    if (!isPasswordValid) throw new BadRequestException('Credentials are invalid');

    const token = await this.signToken(existUser.id.toString(), existUser.username);
    return await this.userRepository.save({ ...existUser, access_token: token });
  }
}
