const {Router}=require("express");
const { createuser, Login } = require("../controller/UserController");
const UserRoutes=Router();

UserRoutes.post("/signup",createuser)
UserRoutes.post("/login",Login)

module.exports=UserRoutes;