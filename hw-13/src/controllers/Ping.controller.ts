import { Get, JsonController } from "routing-controllers";

@JsonController("/ping")
export class PingController {
  @Get("/")
  pingServer() {
    return { ping: "pong" };
  }
}
