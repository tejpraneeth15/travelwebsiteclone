const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedIn,isOwner }=require("../middleware.js");

const listingController = require("../controller/listings.js");

//listings route
router.get("/",wrapAsync(listingController.index));


//new route
router.get("/new",isLoggedIn,(listingController.renderNewForm));

//show route
router.get("/:id",wrapAsync(listingController.showListing));

//create route
router.post("/",isLoggedIn,wrapAsync(listingController.createNewListing));

//edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn,isOwner, wrapAsync(listingController.updateListing));

 
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;