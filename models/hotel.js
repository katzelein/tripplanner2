var Sequelize = require('sequelize');
var db = require('./_db');


var Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.INTEGER //ENUM('1','2','3','4','5') //integer 1-5
  }, 
  amenities: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function (amenity) {
      amenity = amenity || [];
      if (typeof amenity === 'string') {
        amenity = amenity.split(',').map(function (str) {
          return str.trim();
        });
      }
      this.setDataValue('amenity', amenity);
    }
  }
});


module.exports = Hotel;