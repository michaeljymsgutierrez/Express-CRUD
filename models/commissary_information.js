var mongoose = require('mongoose');

//Commissary Information Schema
var commissarySchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String,
      },
      commissary_data: {
          type: Array
      }

},{collection:'commissary_information'});

var Commissary = module.exports = mongoose.model('Commissary',commissarySchema);

// GET All Data from Commissary
module.exports.getAllCommissaryData = function(callback){
    Commissary.find(callback);
};

// GET ONE Data from Commissary
module.exports.getCommissaryData = function(id,callback){
    Commissary.find(id,callback);
};

//POST Data to Commissary
module.exports.addCommissaryData = function(addItem,callback){
    Commissary.create(addItem,callback);
};

//PUT Data to Commissary
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      commissary_data: updateData.commissary_data
    };
    Commissary.findOneAndUpdate(query,update,callback,options);
};
