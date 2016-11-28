var mongoose = require('mongoose');

var productionSchema = mongoose.Schema({

    store_id: {
        type: Number
    },
    date_created: {
        type: String
    },
    production_data: {
        type : Array
    }

},{collection:'production_information'});

var Production = module.exports = mongoose.model('Production',productionSchema);

// GET All Data from Production
module.exports.getAllProductionData = function(callback){
    Production.find(callback);
};

//GET Data from Production
module.exports.getProductionData = function(id,callback){
    Production.find(id,callback);
};

//POST Data to Production
module.exports.addProductionData = function(addItem,callback){
    Production.create(addItem,callback);
};

//PUT Data to Inventory Item
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      production_data: updateData.production_data
    };
    Production.findOneAndUpdate(query,update,callback,options);
};
