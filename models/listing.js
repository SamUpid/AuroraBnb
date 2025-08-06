const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;  // Shortcut for defining schemas
const Review = require("./review.js");
const { required } = require("joi");

/*const DEFAULT_IMAGE = {
  filename: "defaultImage",
  url: "https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}; */

// Define the schema for a listing
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String, // Image URL (e.g., from Cloudinary)
        filename: String,
    },
    price: {
    type: Number,
    required: true,
    min: 0,   // Cannot be negative
    default: 0
},

    location: String,
    country: String,
        geometry: {  
        type: {
            type: String,
            enum: ['Point'], // Only 'Point' is allowed
            required: true
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            required: true
        }
    },
    // Array of reviews associated with the listing
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"  // Reference to Review model
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to User model (who created the listing)
    },

    category: {
        type: String,
        enum: ["Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"],
        required: true
    }

});
// Mongoose middleware: deletes associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
   if(listing){
     await Review.deleteMany({_id: {$in: listing.reviews}}); // Delete all reviews belonging to the deleted listing
   }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; // Export the model to be used in controllers