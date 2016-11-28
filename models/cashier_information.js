var mongoose = require('mongoose');

//Cashier Information Schema
var cashierSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String,
      },
      cashier_data: {
          type: Array
      }

},{collection:'cashier_information'});

var Cashier = module.exports = mongoose.model('Cashier',cashierSchema);

// GET All Data from Cashier
module.exports.getAllCashierData = function(callback){
    Cashier.find(callback);
};

// GET ONE Data from Cashier
module.exports.getCashierData = function(id,callback){
    Cashier.find(id,callback);
};

//POST Data to Cashier
module.exports.addCashierData = function(addItem,callback){
    Cashier.create(addItem,callback);
};

//PUT Data to Cashier
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      cashier_data: updateData.cashier_data
    };
    Cashier.findOneAndUpdate(query,update,callback,options);
};
