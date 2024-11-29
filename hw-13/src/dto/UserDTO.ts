import { IsString, IsEmail, Length } from "class-validator";

export class UserDTO {
  @IsString()
  @Length(3, 30)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 20)
  password!: string;
}
