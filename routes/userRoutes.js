// routes/userRoutes.js
import express from "express";
import {
  changePassword,
  createUser,
  findUserByCustomId,
  forgetPassword,
  getAllUsers,
  getMemeberById,
  getProfile,
  loginUser,
  processGift,
  processMonthlyPayment,
  sendContactEmail,
  updateProfile,
  updateProfileByAdmin,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
// import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/findById/:id",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getMemeberById);
userRoutes.post("/findUserById", findUserByCustomId);
userRoutes.get("/all",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getAllUsers);
userRoutes.post("/edit/:id",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), updateProfileByAdmin);
userRoutes.get("/profile", authMiddleware, getProfile);
userRoutes.post("/profile", authMiddleware, updateProfile);
userRoutes.post("/sendMail", sendContactEmail);
userRoutes.post("/changePassword",authMiddleware, changePassword);
userRoutes.post("/forgetPassword", forgetPassword);
export default userRoutes;
