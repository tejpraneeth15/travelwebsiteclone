const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");





router.post("/",wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing.id}`);
}));

//delete review 
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
let {id,reviewId}=req.params;

await Review.findByIdAndDelete(reviewId);
res.redirect(`/listings/${id}`);
}));

module.exports=router;