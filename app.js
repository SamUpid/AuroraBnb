// Load environment variables in development
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Import routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Import the listing controller for AI routes
const listingController = require("./controllers/listings.js"); 

// Database connection setup
//const MONGO_URL = 'mongodb://127.0.0.1:27017/AuroraBnb';
const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}



// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //Important for parsing JSON requests from AI endpoints
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Add CORS middleware
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET || 'fallback-secret-key', // Provide fallback
    },
    touchAfter: 24* 3600, // session update
});

store.on("error", (err) =>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

// Session configuration
const sessionOptions = {
    store,
    secret: process.env.SECRET || 'fallback-secret-for-development',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' // HTTPS in production
    },
}

// Initialize session and flash message
app.use(session(sessionOptions));
app.use(flash());

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Configure user serialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to make flash messages and user available to all templates
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// AI description routes - these should work now
app.post("/generate-description", listingController.generateDescription);
app.post("/enhance-description", listingController.enhanceDescription);


// Test route for OpenAI connection (useful for debugging)
app.get('/test-openai', async (req, res) => {
    try {
        const aiService = require('./services/aiService');
        const result = await aiService.testConnection();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to test AI service',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

//Global Error handler
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
    // Log error for debugging
    console.error(`Error ${statusCode}: ${message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }
    res.status(statusCode).render("error.ejs", {err, message});
});



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`\u{1F680} Server is running on port ${PORT}`);
    console.log(`\u{1F4F1} App URL: http://localhost:${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`\u{1F9EA} Test AI: http://localhost:${PORT}/test-openai`);
    }
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
