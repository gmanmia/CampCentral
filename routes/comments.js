var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});        
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Ooooops... Something went wrong!")
                    console.log(err);
                } else {
                    // associate user with the comment and save
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // associate comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Succesfully added comment!")
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Succesfully UPDATED your comment!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   })
});

// DESTROY comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Succesfully DELETED your comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;