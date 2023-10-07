import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const kittySchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, "please enter your email address"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        select:false,
        minLength:[6,"password should be more then 6 character"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

kittySchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    };
    this.password=await bcrypt.hash(this.password,10);
    next()

});

kittySchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.jwt_secret,{
        expiresIn:"3d"
    })
};

kittySchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
const userdata=mongoose.model("user",kittySchema);
export default userdata;