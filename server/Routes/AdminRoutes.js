import express from "express";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import {
  AdminInfo,
  AdminLogin,
  Logout,
  adminSignup,
  createAgent,
  getLeadsBoard,
  uploadList,
} from "../Controllers/AdminController.js";
import upload from "../config/multer.js";

const AdminRoutes = express.Router();

AdminRoutes.post("/admin-Login", AdminLogin);
AdminRoutes.post("/admin-signup", adminSignup);
AdminRoutes.get("/Admin-info", verifyToken, AdminInfo);
AdminRoutes.get("/logout", Logout);
AdminRoutes.post(
  "/upload-csv",
  verifyToken, // admin only
  upload.single("file"), // field name = file
  uploadList
);
AdminRoutes.post("/create-Agent", createAgent);
AdminRoutes.get("/with-leads",verifyToken,getLeadsBoard);

export default AdminRoutes;
