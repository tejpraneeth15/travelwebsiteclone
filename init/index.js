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
    modifiedData=initData.data.map((obj)=>({...obj,owner:"67b58d49cf29375873926e3a"}));
    await Listing.insertMany(modifiedData);
    console.log("data was initialised");
};

// const initDB = async () => {
//     try {
//         await Listing.deleteMany({});
        
//         // Create a new array with the added owner field
//         const modifiedData = initData.data.map((obj) => ({
//             ...obj,
//             owner: "67b58d49cf29375873926e3a"
//         }));

//         await Listing.insertMany(modifiedData); // Insert the modified array
//         console.log("Data was initialized");
//     } catch (err) {
//         console.error("Error initializing data:", err);
//     } finally {
//         mongoose.connection.close(); // Close the connection after seeding
//     }
// };

initDB();


