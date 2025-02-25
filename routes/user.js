const express=require("express");
const router = express.Router();
const mongoose=require("mongoose");
const path=require("path");
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const usersController=require("../controller/users.js");


router.route("/signup")
.get(wrapAsync(usersController.rendersignup))
.post(wrapAsync(usersController.signup));

router.route("/login")
.get(wrapAsync(usersController.renderLogin))
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),wrapAsync(usersController.login));


router.get("/logout",usersController.logout);


module.exports=router;