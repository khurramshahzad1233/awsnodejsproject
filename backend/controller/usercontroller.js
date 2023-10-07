import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import userdata from "../models/userschema.js";
import dotenv from "dotenv"
import sendtoken from "../utils/sendtoken.js";
import jwt from "jsonwebtoken"
import jwt_decode from "jwt-decode";
import googledata from "../models/googleschema.js";
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};


            
export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    let user=await userdata.findOne({email});
    if(user){
        return next(new Errorhandler("user already exist", 409))
    };
    user=await userdata.create({
        email,password
    })
    sendtoken(res,user,201,"register user successfully")
    

    
});


export const loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email",401))
    };
    const matchpassword=await user.comparepassword(password);
    
    if(!matchpassword){
        return next(new Errorhandler("incorrect password",401))
    };
    sendtoken(res,user,200,"welcome back")
});


export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }).json({
        success:true,
        message:"logout successfully"
    })
})


export const getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    // console.log(user)
    if(!user){
        return next(new Errorhandler("please login to access the resource",401))
    };
    res.status(200).json({
        success:true,
        user,
    })
});



// google authentication controller

export const googleregistercontroller=catchasyncerror(async(req,res,next)=>{
    const {token}=req.body;
    
    if(!token){
        return next(new Errorhandler("require field are missing",400))
    };
    const userinfo=jwt_decode(token);

    const {email,name,picture}=userinfo;
    let user=await googledata.findOne({email});
    if(!user){
        user=await googledata.create({
            email,name,picture
        });
    };
    
    const options={
        expires:new Date(Date.now()+3*24*60*60*100),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
    res.status(201).cookie("googletoken",token,options).json({
        success:true,
        message:"login successfully"
    })

    
    
    


});

export const googleprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const {googletoken}=req.cookies;
    if(!googletoken){
        return next(new Errorhandler("Please login to access the resource",401))
    };

    const userinfo=jwt_decode(googletoken);
    const {email,name,picture}=userinfo;

    res.status(200).json({
        success:true,
        email,name,picture,
        message:"user signin"
    })
    

});


export const logoutgooglecontroller=catchasyncerror(async(req,res,next)=>{
    const {googletoken}=req.cookies;
    
    res.status(200).cookie("googletoken",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none",
    }).json({
        success:true,
        message:"logout successfully",
    })
})