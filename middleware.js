const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

/**
 * Authentication Middleware
 * Checks if user is logged in, if not redirects to login page
 * Stores original URL for post-login redirect
 */
module.exports.isLoggedIn = (req, res, next) =>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

/**
 * URL Preservation Middleware
 * Saves redirect URL from session to res.locals
 * Ensures URL persists after authentication
 */
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
         delete req.session.redirectUrl;
    }
    next();
};


/**
 * Explicitly saves session before redirect to ensure flash messages persist
 * Use this before redirects that need to preserve flash messages
 */
module.exports.saveSession = (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return next(err);
        }
        next();
    });
};

/**
 * Sets flash message and saves session to ensure message persists
 */
module.exports.setFlashAndSave = (req, type, message) => {
    return new Promise((resolve, reject) => {
        req.flash(type, message);
        req.session.save((err) => {
            if (err) {
                console.error('Session save error after flash:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

/**
 * Ownership Verification Middleware
 * Verifies current user is the owner of the listing
 * Prevents unauthorized edits/deletions
 */
module.exports.isOwner = async(req, res, next) =>{

  try {
        let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
    } catch (error) {
        const errorMessage = "Page not exists anymore";
        const err = new ExpressError(400, errorMessage);
        next(err);
    }
};

/**
 * Listing Validation Middleware
 * Validates listing data against Joi schema
 * Ensures data integrity before database operations
 */
module.exports.validateListing = (req, res, next) =>{
    let {error}= listingSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(400, errMsg);
        }else{
            next();

        }
};

/**
 * Review Validation Middleware
 * Validates review data against Joi schema
 * Maintains consistent review data structure
 */
module.exports.validateReview = (req, res, next) =>{
    let {error}= reviewSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(400, errMsg);
        }else{
            next();

        }
};

/**
 * Review Authorization Middleware
 * Verifies current user is the author of the review
 * Prevents unauthorized review modifications
 */
module.exports.isReviewAuthor = async(req, res, next) =>{

let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId).populate("author");
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};