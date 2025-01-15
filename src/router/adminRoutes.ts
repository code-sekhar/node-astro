import express from "express";
import AdminController from "../controller/admin/AdminController";
import authenticate from "../middleware/authMiddleware";
const router = express.Router();

router.post("/admin", AdminController.createAdmin);
router.post("/login", AdminController.loginAdmin);
router.get("/profile", authenticate, AdminController.adminProfile);

export default router;