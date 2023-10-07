import mongoose from "mongoose";
import validator from "validator";

const googleSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email address is missing"],
        unique:true,
        validate:validator.isEmail,
    },
    name:{
        type:String,
        required:true,
    },
    picture:{
        type:String,

    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});
const googledata=mongoose.model("google",googleSchema);
export default googledata;