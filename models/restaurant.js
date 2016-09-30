var Sequelize = require('sequelize');
var db = require('./_db');

var Restaurant = db.define('restaurant', { 
  name: {
    type: Sequelize.STRING
  },
  cuisine: { 
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function (cuisine) {
      cuisine = cuisine || [];
      if (typeof cuisine === 'string') {
        cuisine = cuisine.split(',').map(function (str) {
          return str.trim();
        });
      }
      this.setDataValue('cuisine', cuisine);
    }
  },
  price: {
    type: Sequelize.INTEGER // ENUM('1','2','3','4','5') //integer 1-5 dollar signs
  }
});


module.exports = Restaurant;