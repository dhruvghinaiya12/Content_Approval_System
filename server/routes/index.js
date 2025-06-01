const {Router}=require("express");
const UserRoutes = require("./UserRoutes");
const ArticleRoutes = require("./ArticleRoutes");
const Routes=Router();

Routes.use("/user",UserRoutes)
Routes.use("/article",ArticleRoutes)

module.exports=Routes;
