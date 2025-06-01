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