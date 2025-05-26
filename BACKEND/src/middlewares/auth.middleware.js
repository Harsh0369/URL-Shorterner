import { verifyToken } from "../utils/helper.js";
import { findUserById } from "../dao/user.dao.js";
import User from "../models/userModel.js"; 

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing",
    });
  }

  try {
   
    const decoded = verifyToken(token); 
    const user = findUserById(decoded);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user; 
    next(); 
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
};
