import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // TODO: add secret key .env
    });
  }

  async validate(payload: JwtPayloadDto) {
    console.log(payload);
    return this.userService.getUserById(payload.sub);
  }
}
