const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// hash password and compare password
exports.HashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Password hashing failed: " + error.message);
  }
};


exports.ComparePassword = async (hash, password) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Password comparison failed: " + error.message);
  }
};


// generate and decode token
exports.GenerateToken = (data) => {
  try {
    return jwt.sign(data, process.env.SECRET_KEY);
  } catch (error) {
    throw new Error("Token generation failed: " + error.message);
  }
};


exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw new Error("Token verification failed: " + error.message);
  }
};
