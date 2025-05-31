const User = require("../model/UserSchema");
const {
  HashPassword,
  GenerateToken,
  ComparePassword,
} = require("../utils/Helper");

exports.createuser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let ExistUser = await User.findOne({ email: email });

    if (ExistUser) {
      return res.status(409).json({ message: "email already exists" });
    }

    let hashedPassword = await HashPassword(password);
    req.body.password = hashedPassword;

    let users = await User.create(req.body);

    let token = await GenerateToken({
      id: users.id,
      role: users.role,
    });
    res
      .status(200)
      .json({ message: "user created successfully", users, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    let isMatch = await ComparePassword(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    let token = await GenerateToken({
      id: user.id,
      role: user.role,
    });

    return res.status(200).json({ message: "Succesfully Login", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: error.message });
  }
};

exports.getAllWriters = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const writers = await User.find({ role: "writer" }).select("-password");
    res.status(200).json(writers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
