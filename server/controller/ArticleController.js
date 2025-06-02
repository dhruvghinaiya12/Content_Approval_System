const Article = require("../model/ArticleScema");

exports.CreateArticle=async(req,res)=>{
   try {
     req.body.writer=req.user.id;
     
     const newArticle=await Article.create(req.body)
     res.status(201).json({ message: "Article submitted successfully", article: newArticle });
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}

exports.getMyArticles = async (req, res) => {
  try {
    const writer = req.user.id;

    const articles = await Article.find({ writer }).sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const { articleId } = req.params;    
    const { title, content } = req.body;

    const article = await Article.findOne({ _id: articleId, writer: req.user.id });
    
    if (!article) {
      return res.status(404).json({ message: "Article not found or access denied" });
    }

    article.title = title;
    article.content = content;
    article.status = "pending";
    article.feedback = "";
    await article.save();

    res.status(200).json({ message: "Article resubmitted successfully", article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingArticles = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const pendingArticles = await Article.find({ status: "pending" }).populate("writer", "name email");

    res.status(200).json(pendingArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reviewArticle = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { articleId } = req.params;
    const { status, feedback } = req.body;

    if (!["approved", "rejected", "edit_requested"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const article = await Article.findByIdAndUpdate(
      articleId,
      { status, feedback },
      { new: true, runValidators: true }
    ).populate("writer", "name email");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: `Article ${status}`, article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;

    const article = await Article.findById(articleId).populate("writer", "name email");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (req.user.role === "writer" && article.writer._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};