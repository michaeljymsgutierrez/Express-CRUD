var mongoose = require('mongoose');

//Commissary Approved Order Requestn Transaction Numbers Schema
var commissaryAORTNSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    transaction_numbers: {
        type: Array
    }

},{collection:'commissary_approved_order_requests_information_transaction_numbers'});

var Commissary_AORTN = module.exports = mongoose.model('Commissary_AORTN',commissaryAORTNSchema);

// GET Data from Commissary Approved Order Request Transaction Numbers Data
module.exports.getCAORTNData = function(id,callback){
    Commissary_AORTN.find(id,callback);
};

//POST Data to Commissary Approved Order Request Transaction Numbers Data
module.exports.addCAORTNData = function(addItem,callback){
    Commissary_AORTN.create(addItem,callback);
};

//PUT Data to Commissary Approved Order Request Transaction Numbers  Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      transaction_numbers: updateData.transaction_numbers
    };
    Commissary_AORTN.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Commissary Approved Order Request Transaction Numbers  Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Commissary_AORTN.remove(query,callback);
};
