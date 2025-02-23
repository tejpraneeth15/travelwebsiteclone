const express=require("express");
const router = express.Router();
const mongoose=require("mongoose");
const path=require("path");
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const usersController=require("../controller/users.js");



router.get("/signup",wrapAsync(usersController.rendersignup));

router.post("/signup",wrapAsync(usersController.signup));

router.get("/login",wrapAsync(usersController.renderLogin));

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),wrapAsync(usersController.login));

router.get("/logout",usersController.logout);


module.exports=router;