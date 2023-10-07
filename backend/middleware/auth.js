import userdata from "../models/userschema.js";
import catchasyncerror from "./catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

export const authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new Errorhandler("please login to access the resource",401))
    };

    const accessdata=jwt.verify(token,process.env.jwt_secret);
    req.user=await userdata.findById(accessdata.id);
    
    next()
})