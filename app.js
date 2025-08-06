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
const multer = require('multer');
const { storage } = require('./cloudinary'); // if using Cloudinary
const upload = multer({ storage });

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

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

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// View engine setup
app.set("view engine", "ejs"); // Set EJS as template engine
app.set("views", path.join(__dirname, "views"));// Set views directory
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(methodOverride("_method"));// Enable method override
app.engine('ejs', ejsMate); // Use ejs-mate for layouts
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24* 3600,
});

store.on("error", (err) =>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

// Session configuration
const sessionOptions = {
    store,
    secret: process.env.SECRET, // Secret for signing session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week expiration
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week max age
        httpOnly: true, // Cookie not accessible via client-side JS
    },
}
// Initialize session and flash message
app.use(session(sessionOptions));
app.use(flash());

// Passport authentication setup
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Enable persistent login sessions
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy

// Middleware to make flash messages and user available to all templates
app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Configure user serialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
  res.redirect('/listings');
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error handler
app.use((err, req, res, next) => {
   let {statusCode = 500, message = "Something went wrong"} = err;
   res.status(statusCode).render("error.ejs", {err, message});
});

// Then start the server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
