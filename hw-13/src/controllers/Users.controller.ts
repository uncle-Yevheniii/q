import {
  JsonController,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  Put,
  NotFoundError,
} from "routing-controllers";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/Users";
import { UserDTO } from "../dto/UserDTO";

@JsonController("/users")
export class UsersController {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  @Post("/")
  @HttpCode(201)
  async createUser(@Body() data: UserDTO) {
    const newEntity = this.userRepository.create(data);
    return await this.userRepository.save(newEntity);
  }

  @Get("/")
  async getAllUsers() {
    return await this.userRepository.find();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) throw new NotFoundError("User not found");
    return entity;
  }

  @Put("/:id")
  async updateUser(@Param("id") id: number, @Body() data: Partial<UserDTO>) {
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) throw new NotFoundError("User not found");

    this.userRepository.merge(entity, data);
    return await this.userRepository.save(entity);
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteUser(@Param("id") id: number) {
    const entity = await this.userRepository.findOneBy({ id });
    if (!entity) throw new NotFoundError("User not found");

    return await this.userRepository.remove(entity);
  }
}
