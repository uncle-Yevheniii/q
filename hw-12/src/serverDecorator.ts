import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./UserController";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [UserController],
});

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
