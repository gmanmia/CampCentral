var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});


// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
            username: req.body.username, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
            email: req.body.email,
            about: req.body.about
        });
    // eval(require("locus"));
    if(req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username + "!");
            res.redirect("/campgrounds");
        })
    })
});

// show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// process login, proceed if authenticated
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Succesfully logged out!");
    res.redirect("/campgrounds");
});

// Index user profile
router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           console.log(err);
           req.flash("error", "Something went wrong with user profile!")
           res.redirect("back")
       } 
       res.render("users/show", {user: foundUser});
   });
});

// Show EDIT form for user
router.get("/users/:id/edit", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           console.log(err);
           req.flash("error", "Cannot find profile!")
           res.redirect("back")
       } 
       res.render("users/edit", {user: foundUser});
   });
});


// UPDATE user profile 
router.put("/users/:id/edit", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.updatedInfo, function(err, foundUser){
        if(err){
            console.log(err);
            req.flash("error", "Could Not Update User");
            res.redirect("back");
        } else{
            req.flash("success","Profile Successfully Updated!");
            res.redirect("/users/" + foundUser._id);
        }
    });
});

module.exports = router;