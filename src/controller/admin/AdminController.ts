import { Request, Response } from "express";
import adminModel from "../../model/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Adjust the path to your admin model
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const createAdmin = async (req:Request, res:Response):Promise<void> => {
    try{
        const admin = new adminModel(req.body);
        const data = await admin.save();
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: data
        });
    }catch(error){
        res.status(500).send(error);
    }
}
const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    

    const { email, password } = req.body;

    try {
        // Check if admin exists
        const admin: any= await adminModel.findOne({ email });
        if (!admin) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
         res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
         return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

         res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error,
        });
    }
}
const adminProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id; // Get user ID from the decoded token (added by middleware)

        // Find the user from the database using the ID
        const user = await adminModel.findById(userId).select("-password"); // Exclude password from response

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({
            success: true,
            user, // Return user data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error });
    }
}
export default {
    createAdmin,
    loginAdmin,
    adminProfile
}