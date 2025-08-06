const Listing = require("../models/listing"); // Import the Listing model
const Review = require("../models/review"); // Import the Review model

// Controller for creating a new review
module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id); // Find the listing by ID from the URL
    let newReview = new Review(req.body.review); // Create a new Review from form data
    newReview.author = req.user._id; // Set the current logged-in user as the author

    listing.reviews.push(newReview); // Add the new review to the listing's reviews array

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`); // Redirect back to the listing's page
};

// Controller for deleting a review
module.exports.destroyReview = async(req, res) => {
    let {id, reviewId} = req.params;

    // Remove the review reference from the listing's reviews array using $pull
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     // Delete the review document from the Review collection
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`); // Redirect back to the listing's pag
};