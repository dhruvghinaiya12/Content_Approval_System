const { Router } = require("express");
const { CreateArticle, getMyArticles } = require("../controller/ArticleController");
const { authMiddleware } = require("../middleware/Auth");

const ArticleRoutes = Router();

ArticleRoutes.post("/create-article", authMiddleware, CreateArticle);
ArticleRoutes.get("/my-articles", authMiddleware, getMyArticles);


module.exports = ArticleRoutes;
