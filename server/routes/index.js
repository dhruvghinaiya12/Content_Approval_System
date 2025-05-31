const {Router}=require("express");
const UserRoutes = require("./UserRoutes");
const Routes=Router();

Routes.use("/user",UserRoutes)

module.exports=Routes;
