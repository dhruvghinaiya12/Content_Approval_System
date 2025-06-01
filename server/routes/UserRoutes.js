const { Router } = require("express");
const {
  createuser,
  Login,
  getUserProfile,
  getAllWriters,
  manageUser,
} = require("../controller/UserController");
const {authMiddleware}=require("../middleware/Auth")
const UserRoutes = Router();

UserRoutes.post("/signup", createuser);
UserRoutes.post("/login", Login);
UserRoutes.get("/profile", authMiddleware, getUserProfile);
UserRoutes.get("/writers", authMiddleware, getAllWriters);
UserRoutes.patch("/manage/:userId", authMiddleware, manageUser);

module.exports = UserRoutes;
