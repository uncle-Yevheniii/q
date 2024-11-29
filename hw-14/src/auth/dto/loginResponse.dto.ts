import { Expose, Type } from 'class-transformer';
import { User } from '../../user/User.entity';

export class LoginResponseDto {
  @Expose()
  token: string;

  @Expose()
  @Type(() => User)
  user: User;
}
