const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const flash=require("connect-flash");
const {isLoggedIn,isAuthor }=require("../middleware.js");
const reviewController=require("../controller/reviews.js");



router.post("/",isLoggedIn,wrapAsync(reviewController.createReview));

//delete review 
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;