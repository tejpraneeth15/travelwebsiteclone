const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");



//listings route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));


//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

//create route
router.post("/",wrapAsync( async(req,res)=>{
        let {title,description,price,image,country,location}=req.body;
    let newListing=new Listing({
        title,
        description,
        price,
        image:{url :image},
        location,
        country
    });

    await newListing.save();
    req.flash("success","New Lisitng Created");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    
    res.render("listings/edit.ejs",{listing});
}));

//update route
router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const updatedlisting=await Listing.findById(id);

    if (!updatedlisting) {
        return res.status(404).send("Listing not found");
    }

    updatedlisting.title=req.body.title;
    updatedlisting.description=req.body.description;
    updatedlisting.image.url=req.body.image;
    updatedlisting.price=req.body.price;
    updatedlisting.location=req.body.location;
    updatedlisting.country=req.body.country;
    
    await Listing.findByIdAndUpdate(id,updatedlisting);
    req.flash("success","Listing Edited");  
    res.redirect("/listings");

}));

 
//delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted Listing");
    res.redirect("/listings");
}));

module.exports=router;