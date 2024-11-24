import fs from "fs";
import path from "path";
import express, { Request, Response } from "express";

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

export const router = express.Router();

// GET ALL USER
router.get("/users", (_: Request, res: Response) => {
  const users = readData();
  res.status(200).json(users);
});
// GET ONE USER
router.get("/users/:id", (req: Request, res: Response) => {
  const users = readData();
  const { id } = req.params;
  const user = users.find((user: any) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  res.status(200).json(user);
});
// POST USER
router.post("/users", (req: Request, res: Response) => {
  const users = readData();
  const { name } = req.body;

  const newUser = { id: users.length + 1, name: name };

  users.push(newUser);
  writeData(users);

  res.status(201).json(users);
});
// UPDATE USER
router.put("/users/:id", (req: Request, res: Response) => {
  const users = readData();
  const { id } = req.params;
  const { name } = req.body;

  const user = users.find((user: any) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  user.name = name;
  writeData(users);

  res.status(201).json({ msg: "User not found" });
});
// DELETE USER
router.delete("/users/:id", (req: Request, res: Response) => {
  const users = readData();
  const { id } = req.params;

  const user = users.find((user: any) => user.id === parseInt(id));

  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  const newUsers = users.filter((user: any) => user.id !== parseInt(id));
  writeData(newUsers);

  res.sendStatus(204);
});
