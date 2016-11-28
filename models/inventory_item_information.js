var mongoose = require('mongoose');

//Inventory Item Information Schema
var inventoryItemSchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      date_created: {
          type: String
      },
      inventory_item_data: {
          type: Array
      }

},{collection:'inventory_item_information'});

var Inventory_item   = module.exports = mongoose.model('Inventory_item',inventoryItemSchema);

// GET All Data from Inventory Item
module.exports.getAllInventoryItemData = function(callback){
    Inventory_item.find(callback);
};

// GET ONE Data from Inventory Item
module.exports.getInventoryItemData = function(id,callback){
    Inventory_item.find(id,callback);
};

//POST Data to Inventory Item
module.exports.addInventoryItemData = function(addItem,callback){
    Inventory_item.create(addItem,callback);
};

//PUT Data to Inventory Item
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      date_created: updateData.date_created,
      inventory_item_data: updateData.inventory_item_data
    };
    Inventory_item.findOneAndUpdate(query,update,callback,options);
};
