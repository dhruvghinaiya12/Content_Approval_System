const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.authMiddleware = async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "token is required" });
  }

  try {
    const decoded =await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized" });
  }
};

