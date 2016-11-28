var mongoose = require('mongoose');

//Cash Management Schema
var cashManagementSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String,
      },
      cash_management_data: {
          type: Array
      }

},{collection:'cash_management_information'});

var Cash_management = module.exports = mongoose.model('Cash_management',cashManagementSchema);

// GET All Data from Cash Management
module.exports.getAllCashManagementData = function(callback){
    Cash_management.find(callback);
};

// GET ONE Data from Cash Management
module.exports.getCashManagementData = function(id,callback){
    Cash_management.find(id,callback);
};

//POST Data to Cash Management
module.exports.addCashManagementData = function(addItem,callback){
    Cash_management.create(addItem,callback);
};

//PUT Data to Cash Management
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      cash_management_data: updateData.cash_management_data
    };
    Cash_management.findOneAndUpdate(query,update,callback,options);
};
