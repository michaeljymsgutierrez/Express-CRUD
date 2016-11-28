var mongoose = require('mongoose');

//Transfer out Approved Requests Schema
var transferOARSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transferOARdata:{
        type: Array
    }

},{collection:'transfer_out_approved_requests_information'});

var Transfer_OAR = module.exports = mongoose.model('Transfer_OAR',transferOARSchema);

// GET Data from Transfer out Approved Request Data
module.exports.getTOARData = function(id,callback){
    Transfer_OAR.find(id,callback);
};

//POST Data to Transfer out Approved Request Data
module.exports.addTOARData = function(addItem,callback){
    Transfer_OAR.create(addItem,callback);
};

//PUT Data to Transfer out Approved Request Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transferOARdata: updateData.transferOARdata
    };
    Transfer_OAR.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Transfer out Approved Request Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Transfer_OAR.remove(query,callback);
};
