var mongoose = require('mongoose');

//Commissary Approved Order Request Schema
var commissaryAORSchema = mongoose.Schema({

    store_id: {
        type: String
    },
    commissary_AOR_data:{
        type: Array
    }

},{collection:'commissary_approved_order_requests_information'});

var Commissary_AOR = module.exports = mongoose.model('Commissary_AOR',commissaryAORSchema);

// GET Data from Commissary Approved Order Request Data
module.exports.getCAORData = function(id,callback){
    Commissary_AOR.find(id,callback);
};

//POST Data to Commissary Approved Order Request Data
module.exports.addCAORData = function(addItem,callback){
    Commissary_AOR.create(addItem,callback);
};

//PUT Data to Commissary Approved Order Request Data
module.exports.updateData = function(id,updateData,callback,options){
    var query = {store_id: id };
    var update = {
      store_id: updateData.store_id,
      commissary_AOR_data: updateData.commissary_AOR_data
    };
    Commissary_AOR.findOneAndUpdate(query,update,callback,options);
};

//DELETE Data to Commissary Approved Order Request Data
module.exports.deleteData = function(id,callback){
    var query = { store_id: id };
    Commissary_AOR.remove(query,callback);
};
