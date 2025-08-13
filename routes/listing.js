const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)
);

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

// AI Description Generation Route (NEW)
router.post("/generate-description", isLoggedIn, wrapAsync(listingController.generateDescription));

// Add this new route for enhancement
router.post("/enhance-description", isLoggedIn, wrapAsync(listingController.enhanceDescription));


router.get("/filter/:q", wrapAsync(listingController.filterListings));

//search
router.get("/search", wrapAsync(listingController.search));

router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;