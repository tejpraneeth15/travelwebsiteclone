const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const  methodOverride =require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");


const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

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

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

//create reviews


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