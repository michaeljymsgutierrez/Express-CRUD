var mongoose = require('mongoose');

//Cashier Item Schema
var cashierItemSchema = mongoose.Schema({

    store_id: {
        type: Number
    },
    cashier_item_data:{
        type: Array
    }

},{collection:'cashier_item_information'});

var Cashier_item = module.exports = mongoose.model('Cashier_item',cashierItemSchema);

// GET Data from Cashier Item
module.exports.getCashierItemData = function(id,callback){
    Cashier_item.find(id,callback);
};

//POST Data to Cashier Item
module.exports.addCashierItemData = function(addItem,callback){
    Cashier_item.create(addItem,callback);
};

//PUT Data to Cashier Item
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      cashier_item_data: updateData.cashier_item_data
    };
    Cashier_item.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Cashier Item
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Cashier_item.remove(query,callback);
};
