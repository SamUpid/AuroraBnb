const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, setFlashAndSave, saveSession } = require("../middleware.js");

// Signup routes
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        
        // FIXED: Login the user and save session before redirect
        req.login(registeredUser, async (err) => {
            if (err) {
                return next(err);
            }
            
            // Set flash message and save session
            req.flash("success", "Welcome to AuroraBnB!");
            
            // Explicitly save session before redirect
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error after signup:', err);
                }
                res.redirect("/listings");
            });
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

// Login routes
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

//Updated login route with proper session handling
router.post("/login", 
    saveRedirectUrl, // This middleware saves the redirect URL
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), 
    async (req, res) => {
        // Set welcome message
        req.flash("success", "Welcome back to AuroraBnB!");
        
        // Get redirect URL or default to listings
        const redirectUrl = res.locals.redirectUrl || "/listings";
        
        // Explicitly save session before redirect
        req.session.save((err) => {
            if (err) {
                console.error('Session save error after login:', err);
            }
            res.redirect(redirectUrl);
        });
    }
);

// Logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        
        // Save session before redirect
        req.session.save((err) => {
            if (err) {
                console.error('Session save error after logout:', err);
            }
            res.redirect("/listings");
        });
    });
});

module.exports = router;