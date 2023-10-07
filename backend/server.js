import app from "./app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongodb);
  console.log("connected to database")

  
}



app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})