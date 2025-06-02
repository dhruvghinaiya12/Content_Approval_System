const { Router } = require("express");
const { CreateArticle, getMyArticles, editArticle, getPendingArticles, reviewArticle, getArticleById } = require("../controller/ArticleController");
const { authMiddleware } = require("../middleware/Auth");

const ArticleRoutes = Router();

ArticleRoutes.post("/create-article", authMiddleware, CreateArticle);
ArticleRoutes.get("/my-articles", authMiddleware, getMyArticles);
ArticleRoutes.patch("/edit/:articleId", authMiddleware, editArticle);
ArticleRoutes.get("/pending", authMiddleware, getPendingArticles);
ArticleRoutes.patch("/review/:articleId", authMiddleware, reviewArticle);
ArticleRoutes.get("/:articleId", authMiddleware, getArticleById);




module.exports = ArticleRoutes;
