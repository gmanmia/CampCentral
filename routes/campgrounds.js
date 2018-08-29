var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

// (RESTful) INDEX - shows all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// (RESTful) CREATE - add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    var newName = req.body.name;
    var price = req.body.price;
    var newImage = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: newName, price: price, image: newImage, description: desc, author: author};
    
    // create new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            res.redirect("/campgrounds");    
       }
    });
});

// (RESTful) NEW - show form to add new item to database (must be show before :id, otherwise this won't render)
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

// (RESTful) SHOW - display info about one item 
router.get("/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT route - pull info from db and display so user can edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});        
        }
    });
});

// UPDATE - actually modify data with what user submitted via edit form
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   var data = 
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, upatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// DESTROY campground 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;