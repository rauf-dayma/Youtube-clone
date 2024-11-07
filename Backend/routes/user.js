import { signIn, signUp, getUserInfo, verifyToken } from "../controllers/user.js";

export function authRoute(app) {
  app.post("/auth/signup", signUp);
  app.post("/auth/login", signIn);
  app.get("/auth/me", verifyToken, getUserInfo);
}
