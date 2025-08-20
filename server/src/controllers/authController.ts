import { Request, Response, NextFunction } from "express";

export const login = (req: Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body;
    if(!email || !password) 
        return res.status(400).json({error:"Invalid input", message: "Please provide both email and password"})
    //validate email and password
    //Create session
    return res.status(200).json({message: "logged in successfully"})
}