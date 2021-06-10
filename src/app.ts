import express from "express";
import session from "express-session";
import { db } from "./db/db";
import user from "./api/User/router";
import camp from "./api/Camp/router";
import reservation from "./api/Reservation/router";
import review from "./api/Review/router";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
  }),
);

app.get("/", async (req, res) => {
  const rows = await db("SELECT * FROM user", []);
  const user1 = rows[0].id;
  console.log(user1);
  res.send(rows);
});
app.put("/", async (req, res) => {
  const rows = await db("SELECT * FROM host", []);
  const user1 = rows[0].id;
  console.log(user1);
  res.send(rows);
});

app.use("/api/user", user);
app.use("/api/camp", camp);
app.use("/api/reservation", reservation);
app.use("/api/review", review);

app.listen(app.get("port"), () => {
  console.log("start");
});

module.exports = app;
