import { Request, Response, NextFunction } from "express";
import { Log } from "../models/Log.model";

export const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error:", err);

    await Log.create({
        level: "error",
        message: err.message || "Unknown error",
        stack: err.stack,
        route: req.originalUrl,
        meta: { body: req.body, params: req.params, query: req.query }
    });

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
};