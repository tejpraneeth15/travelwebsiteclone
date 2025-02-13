const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelclone");
    
} 


main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

const initDB=async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("data was initialised");
}

initDB();