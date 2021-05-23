import { Router } from "express";
import { login, logout } from "./login";
// import { register, delUser } from "./register";
import { register, delUser } from "./hostRegister";

const router = Router();

//login.ts
router.post("/login", login);
router.post("/logout", logout);

//register.ts
router.post("/register", register);
router.delete("/delUser", delUser);

export default router;
