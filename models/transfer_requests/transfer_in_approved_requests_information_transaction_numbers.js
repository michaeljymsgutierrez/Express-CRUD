var mongoose = require('mongoose');

//Transfer in Approved Requests Transaction Numbers Schema
var transferIARTNSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transaction_numbers: {
        type: Array
    }

},{collection:'transfer_in_approved_requests_information_transaction_numbers'});

var Transfer_IARTN = module.exports = mongoose.model('Transfer_IARTN',transferIARTNSchema);

// GET Data from Transfer in Approved Request Transaction Numbers Data
module.exports.getTIARTNData = function(id,callback){
    Transfer_IARTN.find(id,callback);
};

//POST Data to Transfer in Approved Request Transaction Numbers Data
module.exports.addTIARTNData = function(addItem,callback){
    Transfer_IARTN.create(addItem,callback);
};

//PUT Data to Transfer in Approved Request Transaction Numbers Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transaction_numbers: updateData.transaction_numbers
    };
    Transfer_IARTN.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Transfer in Approved Request Transaction Numbers Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Transfer_IARTN.remove(query,callback);
};
