const User = require("../models/user"); // Import the User model

// Render the signup (registration) form
module.exports.renderSignupForm =  (req, res)=>{
    res.render("users/signup.ejs");
};

// Redirect handler (used post-login/signup)
module.exports.redirect = (req,res) => {
    res.redirect("/listings"); // Default redirect to listings page
}

// Handle user signup and automatic login after registration
module.exports.signup = async(req, res)=>{

    try{
        let {username, email, password}= req.body;
        const newUser = new User({email, username});
         // Register the user with hashed password (using passport-local-mongoose)
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        // Log the user in immediately after successful registration
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err); // Pass error to error handler
            }
            req.flash("success", "Welcome to AuroraBnb");
            res.redirect("/listings");

        });

    }catch(e){
        // If registration fails (e.g., user already exists), show error
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};


// Render the login form
module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

// Handle login logic
module.exports.login =  async(req, res) => {
        req.flash("success", "Welcome back to AuroraBnb!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };

    // Handle logout
    module.exports.logout = (req, res, next)=>{
        // Call Passport's logout function and handle any errors
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });

};