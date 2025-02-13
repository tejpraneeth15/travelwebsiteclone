const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const  methodOverride =require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelclone");
    
} 

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate); 
app.use(express.static("public"));  

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});


//home route
app.get("/",(req,res)=>{
    res.send("Working");
 
});

//listings route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//create route
app.post("/listings",wrapAsync( async(req,res)=>{
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
    res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put("/listings/:id", wrapAsync(async (req, res) => {
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
    res.redirect("/listings");

}));

 
//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));





// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My new villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Goa",
//         country : "India"
//         });

//         await sampleListing.save();
//         console.log("Sample saved");
//         res.send("Success");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("listings/error.ejs",{message});
    //res.status(statusCode).send(message);
    })

app.listen(5000,()=>{
    console.log("working");
})