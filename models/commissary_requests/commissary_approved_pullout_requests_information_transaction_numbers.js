var mongoose = require('mongoose');

//Commissary Approved Pullout Requests Transaction Numbers Schema
var commissaryAPORTNSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transaction_numbers: {
        type: Array
    }

},{collection:'commissary_approved_pullout_requests_information_transaction_numbers'});

var Commissary_APORTN = module.exports = mongoose.model('Commissary_APORTN',commissaryAPORTNSchema);

// GET Data from Commissary Approved Pullout Request Transaction Numbers Data
module.exports.getCAPORTNData = function(id,callback){
    Commissary_APORTN.find(id,callback);
};

//POST Data to Commissary Approved Pullout Request Transaction Numbers Data
module.exports.addCAPORTNData = function(addItem,callback){
    Commissary_APORTN.create(addItem,callback);
};

//PUT Data to Commissary Approved Pullout Request Transaction Numbers Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transaction_numbers: updateData.transaction_numbers
    };
    Commissary_APORTN.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Commissary Approved Pullout Request Transaction Numbers Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Commissary_APORTN.remove(query,callback);
};
