var mongoose = require('mongoose');

//Commissary Approved Pullout Request Schema
var commissaryAPORSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    commissary_APOR_data:{
        type: Array
    }

},{collection:'commissary_approved_pullout_requests_information'});

var Commissary_APOR = module.exports = mongoose.model('Commissary_APOR',commissaryAPORSchema);

// GET Data from Commissary Approved Pullout Request Data
module.exports.getCAPORData = function(id,callback){
    Commissary_APOR.find(id,callback);
};

//POST Data to Commissary Approved Pullout Request Data
module.exports.addCAPORData = function(addItem,callback){
    Commissary_APOR.create(addItem,callback);
};

//PUT Data to Commissary Approved Pullout Request Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      commissary_APOR_data: updateData.commissary_APOR_data
    };
    Commissary_APOR.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Commissary Approved Pullout Request Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Commissary_APOR.remove(query,callback);
};
