const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema= new Schema({
    title : {
        type :String,
        required : true},

    description : String,

    image: {
          filename: { type: String, default: "listingimage" },
          url: { 
            type: String,
            default: "https://www.bing.com/ck/a?!&&p=91e732333e7c7ce00578b3d0911217ae78d2d6a531bd493dbf542d16b20044e7JmltdHM9MTczODM2ODAwMA&ptn=3&ver=2&hsh=4&fclid=1d4a1524-ca3f-6a37-320b-069ccb2f6ba0&u=a1L2ltYWdlcy9zZWFyY2g_cT1kZWZhdWx0JTIwaW1hZ2UmRk9STT1JUUZSQkEmaWQ9QUNDNjNGMDAxMzU4MjAwN0RFQTUyMkVFMjlGQjAwMjRCRjQ3OTM3Qg&ntb=1"
          }
        },
      
      
    price : Number,
    location : String,
    country : String,
    reviews :[
      {
        type : Schema.Types.ObjectId,
        ref :"Review"
      }
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id : {$in : listing.reviews}});
}
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

