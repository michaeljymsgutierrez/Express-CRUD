var mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({

      store_id: {
          type: Number
      },
      inventory_data: {
          type: Array
      }

},{collection:'inventory_information'});

var Inventory = module.exports = mongoose.model('Inventory',inventorySchema);

//GET Data from Inventory
module.exports.getInventoryData = function(id,callback){
    Inventory.find(id,callback);
};

//POST Data to Inventory
module.exports.addInventoryData = function(addItem,callback){
    Inventory.create(addItem,callback);
}

//PUT Data to  Inventory
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      inventory_data: updateData.inventory_data
    };
    Inventory.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Inventory
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Inventory.remove(query,callback);
};
