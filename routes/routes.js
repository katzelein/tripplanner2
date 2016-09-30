var express = require('express');
var router = express.Router();

var Place = require('../models/place');
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Promise = require('bluebird');

module.exports = router;

router.get('/', function(req,res,next) {
  var hotels = Hotel.findAll();
  var restaurants = Restaurant.findAll();
  var activities = Activity.findAll();

  Promise.all([hotels, restaurants, activities])
    .spread(function(dbHotels, dbRestaurants, dbActivities) {
      res.render('index', { hotels: dbHotels, restaurants: dbRestaurants, activities: dbActivities });
    })
    .catch(next);
});
  