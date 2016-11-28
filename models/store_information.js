var mongoose = require('mongoose');

//Store Schema
var storeSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    store_name: {
        type: String
    },
    store_code: {
        type: String
    },
    company: {
        type: String
    },
    bank: {
        type: Array
    },
    location: {
        type: String
    }

},{collection:'store_information'});

var Store = module.exports = mongoose.model('Store',storeSchema);

//Get All Store Data
module.exports.getAllStoreData = function(callback){
      Store.find(callback);
};

// GET ONE Data from Store Data
module.exports.getStoreData = function(id,callback){
    Store.find(id,callback);
};

//POST Data to Store Data
module.exports.addStoreData = function(addItem,callback){
    Store.create(addItem,callback);
};

//PUT Data to Store Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = { store_id: id };
    var update = {
      store_id: updateData.store_id,
      store_name: updateData.store_name,
      store_code: updateData.store_code,
      company: updateData.company,
      bank: updateData.bank,
      location: updateData.location
    };
    Store.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Store Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Store.remove(query,callback);
};
