import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    userId?: string
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({ message: "No token prvided"});

        const decoded = verifyToken(token) as any;
        req.userId = decoded.id;

        next()

    }catch(err){
        next(err);

    }
};