import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET||"1234@1234";
export const userMiddleware = async(req:Request,res:Response , next:NextFunction)=>{
    const authheader = req.headers["authorization"];
    if(!authheader){
        res.status(401).json({msg:"authorization header missing"});
        return;
    }
    const decoded = jwt.verify(authheader as string,JWT_SECRET);
    if(decoded){
        // @ts-ignore
        req.userId  = decoded.id;
        next();
    }else{
        res.status(403).json({
            msg:"you are not logged in "
        })
        return ;
    }
}