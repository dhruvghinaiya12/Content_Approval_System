const { Router } = require("express");
const {
  createuser,
  Login,
  getUserProfile,
  getAllWriters,
} = require("../controller/UserController");
const {authMiddleware}=require("../middleware/Auth")
const UserRoutes = Router();

UserRoutes.post("/signup", createuser);
UserRoutes.post("/login", Login);
UserRoutes.get("/profile", authMiddleware, getUserProfile);
UserRoutes.get("/writers", authMiddleware, getAllWriters);


module.exports = UserRoutes;
