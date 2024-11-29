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

import fs from "fs";
import path from "path";
import { bodyValidate } from "./bodyValidator";

const db_path = path.resolve(__dirname, "db", "db.json");

const readData = () => {
  const data = fs.readFileSync(db_path, "utf-8");
  const users = JSON.parse(data);
  return users;
};

const writeData = (data: any[]): void => {
  const user = fs.writeFileSync(
    db_path,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  return user;
};

@JsonController("/users")
export class UserController {
  @Get("/")
  @HttpCode(200)
  getAllUsers() {
    const users = readData();
    return users;
  }

  @Get("/:id")
  @HttpCode(200)
  getOne(@Param("id") id: string) {
    const users = readData();
    const user = users.find((user: any) => user.id === parseInt(id));
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  @Post("/")
  @bodyValidate()
  @HttpCode(201)
  createUser(@Body() data: { name: string }) {
    const users = readData();
    const newUser = { id: users.length + 1, ...data };
    users.push(newUser);
    writeData(users);
    return newUser;
  }

  @Put("/:id")
  @bodyValidate()
  @HttpCode(201)
  updateUser(@Param("id") id: string, @Body() data: { name?: string }) {
    const users = readData();
    const user = users.find((user: any) => user.id === parseInt(id));
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updateUser = { id: users.length + 1, ...data };
    users.push(updateUser);
    writeData(users);
    return updateUser;
  }

  @Delete("/:id")
  @HttpCode(204)
  delete(@Param("id") id: string) {
    const users = readData();
    const user = users.find((user: any) => user.id === parseInt(id));
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const newUsers = users.filter((user: any) => user.id !== parseInt(id));
    writeData(newUsers);

    return;
  }
}
