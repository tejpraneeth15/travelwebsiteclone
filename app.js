const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const  methodOverride =require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");

const flash=require("connect-flash");


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

const sessionOptions ={
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    },
}

//home route
app.get("/",(req,res)=>{
    res.send("Working");
 
});

app.use(session(sessionOptions));
app.use(flash());

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    next();
})


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