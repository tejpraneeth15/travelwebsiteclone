const express=require("express");
const router = express.Router();
const mongoose=require("mongoose");
const path=require("path");
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");




router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.flash("success","User Registered Succesfully");
    res.redirect("/listings");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),async(req,res)=>{
    
    req.flash("success","Welcome");
    res.redirect("/listings");
});

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
})


module.exports=router;