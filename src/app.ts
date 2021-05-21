import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { db } from "./db/db";
import register from "./api/User/register";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

declare module "express-session" {
  interface SessionData {
    userId: string;
    password: string;
    isHost: boolean;
    isLogedIn: boolean;
  }
}

app.use(
  session({
    secret: "asadlfkj!@#!@#dfgasdg",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", async (req, res) => {
  const rows = await db("SELECT * FROM user", []);
  const user1 = rows[0].id;
  console.log(user1);
  res.send(rows);
});

// app.use("/api/user", user);
app.use("/api/test", register);

app.listen(app.get("port"), () => {
  console.log("start");
});

module.exports = app;
