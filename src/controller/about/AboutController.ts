import { NextFunction, Request, Response } from "express";
import adminModel from "../../model/adminModel";

const AboutCreate = async (req:Request, res:Response,next: NextFunction):Promise<void> => { //NextFunction
    try{
        const about = new adminModel(req.body);
        const data = await about.save();
        res.status(200).json({
            success: true,
            message: "About created successfully",
            data: data
        });
    }catch(error){
        res.status(500).send(error);
    }
}

export default {AboutCreate};
