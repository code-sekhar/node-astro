import express from "express";
import AboutController from "../controller/about/AboutController";
import authenticate from "../middleware/authMiddleware";

const router = express.Router();

router.post("/about",authenticate, AboutController.AboutCreate);

export default router;
