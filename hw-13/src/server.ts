import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { createExpressServer } from "routing-controllers";
import { PingController } from "./controllers/Ping.controller";
import { UsersController } from "./controllers/Users.controller";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    const app = createExpressServer({
      controllers: [PingController, UsersController],
      middlewares: [bodyParser.json(), express.json()],
      validation: true,
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
