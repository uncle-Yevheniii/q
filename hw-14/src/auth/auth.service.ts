import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/User.entity';
import { AuthenticationDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Signs a JWT token with the provided user ID and username.
   *
   * @param userID - The unique identifier of the user.
   * @param username - The username of the user.
   * @returns A promise that resolves to the signed JWT token.
   */
  async signToken(userID: string, username: string): Promise<string> {
    return this.jwt.signAsync(
      { sub: userID, username },
      { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '30d' },
    );
  }

  /**
   * Retrieves a user by their username.
   *
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */
  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  /**
   * Creates a new user with the provided authentication data.
   *
   * @param {AuthenticationDto} data - The authentication data for the new user.
   * @returns {Promise<User | null>} The created user.
   * @throws {BadRequestException} If a user with the provided username already exists.
   */
  async createUser(data: AuthenticationDto): Promise<User | null> {
    const existUser = await this.getUserByUsername(data.username);
    if (existUser) throw new BadRequestException('Username already exists');

    const hashedPassword = await argon.hash(data.password);

    const user = this.userRepository.create({ ...data, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  /**
   * Authenticates a user based on the provided credentials.
   *
   * @param {AuthenticationDto} data - The authentication data transfer object containing the username and password.
   * @returns {Promise<{ user: User; token: string } | null>} A promise that resolves to an object containing the authenticated user and a JWT token, or null if authentication fails.
   * @throws {BadRequestException} If the credentials are invalid.
   */
  async authenticateUser(data: AuthenticationDto): Promise<{ user: User; token: string } | null> {
    const existUser = await this.getUserByUsername(data.username);
    if (!existUser) throw new BadRequestException('Credentials are invalid');

    const isPasswordValid = await argon.verify(existUser.password, data.password);
    if (!isPasswordValid) throw new BadRequestException('Credentials are invalid');

    const token = await this.signToken(existUser.id.toString(), existUser.username);

    return { user: existUser, token };
  }
}
