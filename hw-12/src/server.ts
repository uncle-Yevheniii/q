import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";

import { router as userRouter } from "./router";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/ping", (_: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.use(userRouter);

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
