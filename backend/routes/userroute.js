
import express from "express"
import { getprofilecontroller, googleprofilecontroller, googleregistercontroller, loginusercontroller, logoutgooglecontroller, logoutusercontroller, registerusercontroller} from "../controller/usercontroller.js";
import {authuser} from "../middleware/auth.js"


const router=express.Router();
router.route("/user/register").post(registerusercontroller);
router.route("/user/login").post(loginusercontroller);
router.route("/user/logout").get(logoutusercontroller);
router.route("/user/me").get(authuser,getprofilecontroller);
router.route("/google/new").post(googleregistercontroller);
router.route("/google/profile").get(googleprofilecontroller);
router.route("/google/logout").get(logoutgooglecontroller);





export default router  ;