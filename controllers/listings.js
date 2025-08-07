const axios = require('axios'); // Import axios for making HTTP requests
const Listing = require("../models/listing"); // Import the Mongoose model for listings

// Controller for rendering all listings
module.exports.index = async (req, res)=>{
    const allListings = await Listing.find({}); // Fetch all listings from DB
    res.render("listings/index.ejs", {allListings}); // Render the index page with listings
};

// Controller for rendering the form to create a new listing
module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
};

// Show a specific listing by ID
module.exports.showListings = async (req, res)=>{
    let {id} = req.params;
    const listing= await Listing.findById(id)
    .populate({
            path: "reviews", // Populate reviews
            populate: {
                path: "author", // Also populate each review's author
            }
        })
        .populate("owner"); // Populate the listing owner
    if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};


module.exports.createListing = async (req, res, next) => {
    try {
        // Geocode location using OpenStreetMap (Nominatim API)
        const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params: {
                    format: 'json',
                    q: req.body.listing.location,
                    limit: 1,
                },
                headers: {
                    'User-Agent': 'AuroraBnB/1.0 (your_email@example.com)' // Replace this with real info
                }
            }
        );

        if (geoResponse.data.length === 0) {
            req.flash("error", "Location not found!");
            return res.redirect("/listings/new");
        }

        const { lat, lon } = geoResponse.data[0];

        // Image upload check
        let url = req.file?.path || "";
        let filename = req.file?.filename || "";

        // Create listing
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        // Attach GeoJSON geometry
        newListing.geometry = {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)]
        };

        // Save to DB
        const savedListing = await newListing.save();
        console.log("[Listing Created]:", savedListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (err) {
        console.error("[Listing Creation Error]:", err.message);
        req.flash("error", "Failed to create listing. Please try again.");
        res.redirect("/listings/new");
    }
};


// Render the edit form for a listing
    module.exports.renderEditForm = async (req, res) => {
        let {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        // Resize the image preview URL for editing display
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload/", "/upload/c_fill,w_250,h_300/");
        res.render("listings/edit.ejs", {listing, originalImageUrl});
    };


// Update an existing listing
module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        const currentListing = await Listing.findById(id);
        
        // Construct the update object using new or old values
        const updateData = {
            title: req.body.listing.title || currentListing.title,
            description: req.body.listing.description || currentListing.description,
            price: req.body.listing.price || currentListing.price,
            location: req.body.listing.location || currentListing.location,
            country: req.body.listing.country || currentListing.country,
        };

        // Handle image update if a new file was uploaded
        if (req.file) {
            updateData.image = {
                filename: req.file.filename,
                url: req.file.path
            };
        } else {
            // Keep existing image if no new file was uploaded
            updateData.image = currentListing.image;
        }

        // Update the listing
        await Listing.findByIdAndUpdate(id, updateData);

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Failed to update listing");
        res.redirect(`/listings/${id}/edit`);
    }
};

// Filter listings by category
module.exports.filterListings = async(req, res, next) => {
    const { q } = req.params; // Category passed as route parameter
    const filteredListings = await Listing.find({category: q }).exec(); 
    if(!filteredListings.length){
        req.flash("error", "No Listings exists for this filter!");
        res.redirect("/listings");
        return;
    }
    res.locals.success = `Listings Filtered by ${q}`;
    res.render("listings/index.ejs", { allListings: filteredListings });
}

// Delete a listing by ID
module.exports.destroyListing = async(req, res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); // Delete from DB
    console.log(deletedListing); //After deleting, show that listing details on console window
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}

// Search listings by title, category, country, location, or price
module.exports.search = async(req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " "); //remove start and end space
    console.log(input);
    if(input == "" || input == " "){
        //search value is empty
        req.flash("error", "Search value empty!!!");
        res.redirect("/listings");
    }

    //convert every word first letter capital and other small
    let data = input.split("");
    let element = "";
    let flag = false;
    for(let index = 0; index < data.length; index++) {
        if (index == 0 || flag) {
            element = element + data[index].toUpperCase();
        } else {
            element = element + data[index].toLowerCase();
        }
        flag = data[index] == " ";
    }
    console.log(element); // Final formatted string

     // Search by title (case-insensitive)
    let allListings = await Listing.find({
        title: { $regex: element, $options: "i"},
    });

     // If found by title
    if(allListings.length !=0 ){
        res.locals.success = "Listings searched by title";
        res.render("listings/index.ejs", {allListings});
        return;
    }

    // Search by category if category fails
    if(allListings.length == 0){
        allListings = await Listing.find({
            category: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by category";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }

    // Search by location if country fails
    if(allListings.length == 0) {
        allListings = await Listing.find({
            country: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by country";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }
    if(allListings.length == 0) {
        allListings = await Listing.find({
            location: { $regex: element, $options: "i"},
        }).sort({_id: -1});
        if(allListings.length != 0) {
            res.locals.success = "Listings searched by location";
            res.render("listings/index.ejs", {allListings});
            return;
        }
    }

    const intValue = parseInt(element, 10); //10 for decimal return - int ya NaN
    const intDec = Number.isInteger(intValue); //check intValue is number or not

    if(allListings.length == 0 && intDec) {
        allListings = await Listing.find({ price: { $lte: element }}).sort({
            price: 1,
        });
        if(allListings.length != 0) {
            res.locals.success = `Listings searched for less than Rs ${element}`;
            res.render("listings/index.ejs", { allListings });
            return;
        }
    }
    // If no match found in any category
    if(allListings.length == 0) {
        req.flash("error", "Listings is not here !!!");
        res.redirect("/listings");
    }
}
