import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ error: "No token, authorization failed." });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.id.user.id;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = auth;
