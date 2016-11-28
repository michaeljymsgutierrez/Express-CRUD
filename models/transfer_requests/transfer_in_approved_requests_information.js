var mongoose = require('mongoose');

//Transfer in Approved Requests Schema
var transferIARSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transferIARdata:{
        type: Array
    }

},{collection:'transfer_in_approved_requests_information'});

var Transfer_IAR = module.exports = mongoose.model('Transfer_IAR',transferIARSchema);

// GET Data from Transfer in Approved Request Data
module.exports.getTIARData = function(id,callback){
    Transfer_IAR.find(id,callback);
};

//POST Data to Transfer in Approved Request Data
module.exports.addTIARData = function(addItem,callback){
    Transfer_IAR.create(addItem,callback);
};

//PUT Data to Transfer in Approved Request Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transferIARdata: updateData.transferIARdata
    };
    Transfer_IAR.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Transfer in Approved Request Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Transfer_IAR.remove(query,callback);
};
