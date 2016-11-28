var mongoose = require('mongoose');

//Transfer Out Approved Requests Transaction Numbers Schema
var transferOARTNSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transaction_numbers: {
        type: Array
    }

},{collection:'transfer_out_approved_requests_information_transaction_numbers'});

var Transfer_OARTN = module.exports = mongoose.model('Transfer_OARTN',transferOARTNSchema);

// GET Data from Transfer out Approved Request Transaction Numbers Data
module.exports.getTOARTNData = function(id,callback){
    Transfer_OARTN.find(id,callback);
};

//POST Data to Transfer out Approved Request Transaction Numbers Data
module.exports.addTOARTNData = function(addItem,callback){
    Transfer_OARTN.create(addItem,callback);
};

//PUT Data to Transfer out Approved Request Transaction Numbers Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transaction_numbers: updateData.transaction_numbers
    };
    Transfer_OARTN.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Transfer out Approved Request Transaction Numbers Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Transfer_OARTN.remove(query,callback);
};
