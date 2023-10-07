const sendtoken=(res,user,statusCode,message)=>{
    const token=user.getjwttoken();
    const options={
        expires:new Date(Date.now()+3*24*60*60*100),
        httpOnly:true,
        secure:true,
        sameSite:"none",
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,message,
    })
};
export default sendtoken;