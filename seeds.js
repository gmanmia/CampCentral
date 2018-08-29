var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "Tayrona",
        image: "https://justglobetrotting.com/wp-content/uploads/2015/12/tayrona-park-1080x675.jpg",
        description: "Beautiful seaside camping grounds, full amenities, hammocks tower totally worth it!  Jack rose black & white red lotus knockdhu bloody mary v.o. bloodhound godfather. Benriach singapore sling benromach brandy manhattan; midori pall mall hennessey culture shock tequila sunset. Ruby dutchess. B & b auchroisk four score rose kennedy cocktail glenfarclas red lotus caesar murphy's tinto de verano tequila slammer? Cragganmore glengoyne; culture shock appletini aviation isle of jura cointreau clynelish godmother; culto a la vida. Kentucky tavern bengal sambuca tullibardine sidecar ben nevis courvoisier zombie the goldeneye toro rojo nikolaschka four horsemen. Savoy affair bellini brave bull, deanston,"
    },
       {
        name: "Rio Claro",
        image: "http://www.colombiafacil.com/site/assets/files/1242/q.600x0.jpg",
        description: "Warm location with tons of river activities.  Jack rose black & white red lotus knockdhu bloody mary v.o. bloodhound godfather. Benriach singapore sling benromach brandy manhattan; midori pall mall hennessey culture shock tequila sunset. Ruby dutchess. B & b auchroisk four score rose kennedy cocktail glenfarclas red lotus caesar murphy's tinto de verano tequila slammer? Cragganmore glengoyne; culture shock appletini aviation isle of jura cointreau clynelish godmother; culto a la vida. Kentucky tavern bengal sambuca tullibardine sidecar ben nevis courvoisier zombie the goldeneye toro rojo nikolaschka four horsemen. Savoy affair bellini brave bull, deanston."
    },
       {
        name: "Villa de Leyva",
        image: "http://chipviajero.com/wp-content/uploads/2017/11/Como-Llegar-A-Villa-De-Leyva-D%C3%B3nde-Comer-Hospedarse-Chip-Viajero.jpg",
        description: "Stunning views in cold climate at high altitude.  Jack rose black & white red lotus knockdhu bloody mary v.o. bloodhound godfather. Benriach singapore sling benromach brandy manhattan; midori pall mall hennessey culture shock tequila sunset. Ruby dutchess. B & b auchroisk four score rose kennedy cocktail glenfarclas red lotus caesar murphy's tinto de verano tequila slammer? Cragganmore glengoyne; culture shock appletini aviation isle of jura cointreau clynelish godmother; culto a la vida. Kentucky tavern bengal sambuca tullibardine sidecar ben nevis courvoisier zombie the goldeneye toro rojo nikolaschka four horsemen. Savoy affair bellini brave bull, deanston."
    }
    ];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("removed campgrounds!");
        // add seed data
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
              if(err){
                  console.log(err);
              } else {
                  console.log("added a campground");
                  //add comments
                  Comment.create(
                      {
                      text: "This place is great.",
                      author: "Homero"
                      }, function(err, comment){
                          if(err){
                              console.log(err);
                          } else {
                              console.log("added comment")
                              campground.comments.push(comment);
                              campground.save();
                          }
                      }
                  );
              }
            });  
        });
    });
    
    
    
};

module.exports = seedDB;
