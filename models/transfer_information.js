var mongoose = require('mongoose');

//Transfer Information Schema
var transferSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String,
      },
      transfer_data: {
          type: Array
      }

},{collection:'transfer_information'});

var Transfer = module.exports = mongoose.model('Transfer',transferSchema);

// GET All Data from Transfer
module.exports.getAllTransferData = function(callback){
    Transfer.find(callback);
};

// GET ONE Data from Transfer
module.exports.getTransferData = function(id,callback){
    Transfer.find(id,callback);
};

//POST Data to Transfer
module.exports.addTransferData = function(addItem,callback){
    Transfer.create(addItem,callback);
};

//PUT Data to Cash Management
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      transfer_data: updateData.transfer_data
    };
    Transfer.findOneAndUpdate(query,update,callback,options);
};
