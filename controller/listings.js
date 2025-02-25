const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{  
    res.render("listings/new.ejs");
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not Exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createNewListing=async(req,res)=>{
    let newurl=req.file.path;
    let newfilename=req.file.filename;
    let {title,description,price,country,location}=req.body;
let newListing=new Listing({
    title,
    description,
    price,
    image:{url :newurl,filename:newfilename},
    location,
    country
});
newListing.owner=req.user._id; 

await newListing.save();
req.flash("success","New Lisitng Created");
res.redirect("/listings");
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    const updatedlisting=await Listing.findById(id);
    if (!updatedlisting) {
        return res.status(404).send("Listing not found");
    }

    updatedlisting.title=req.body.title;
    updatedlisting.description=req.body.description;
    updatedlisting.image.url=req.file.path;
    updatedlisting.image.filename=req.file.filename;
    updatedlisting.price=req.body.price;
    updatedlisting.location=req.body.location;
    updatedlisting.country=req.body.country;
    
    await Listing.findByIdAndUpdate(id,updatedlisting);
    req.flash("success","Listing Edited");  
    res.redirect("/listings");

};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted Listing");
    res.redirect("/listings");
};